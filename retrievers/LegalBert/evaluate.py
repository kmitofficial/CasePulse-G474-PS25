#!/usr/bin/env python3
import argparse, sys
from typing import Dict, List, Set, Tuple

import numpy as np
from tqdm import tqdm
import faiss
import torch
from transformers import AutoTokenizer, AutoModel

# Load files
def load_pid2did(path: str) -> Dict[int, int]:
    """
    Loads mapping.pid2did.tsv (pid -> did).
    File format: either 'pid\tdid' OR 'pid\t...\tdid'
    """
    mapping: Dict[int, int] = {}
    with open(path, "r", encoding="utf-8", errors="ignore") as f:
        for line in tqdm(f, desc="[mapping] load", unit="rows"):
            parts = line.strip().split("\t")
            if not parts:
                continue
            if len(parts) == 2:
                pid, did = int(parts[0]), int(parts[1])
            else:
                pid, did = int(parts[0]), int(parts[-1])
            mapping[pid] = did
    print(f"[mapping] loaded {len(mapping):,} entries")
    return mapping

def load_qrels(path: str) -> Dict[str, Set[int]]:
    rels: Dict[str, Set[int]] = {}
    with open(path, "r", encoding="utf-8", errors="ignore") as f:
        for line in f:
            if not line.strip():
                continue
            parts = line.split()
            qid = parts[0]
            did = int(parts[2])
            rels.setdefault(qid, set()).add(did)
    return rels

def load_queries(path: str) -> List[Tuple[str, str]]:
    queries = []
    with open(path, "r", encoding="utf-8", errors="ignore") as f:
        for line in f:
            if not line.strip():
                continue
            parts = line.rstrip("\n").split("\t", 1)
            if len(parts) == 2:
                qid, qtext = parts
            else:
                parts = line.split(" ", 1)
                if len(parts) != 2:
                    continue
                qid, qtext = parts
            queries.append((qid, qtext))
    return queries

# Model encoder
class QueryEncoder:
    def __init__(self, model_name: str, normalize: bool = True, device: str = None, max_len: int = 512):
        self.tok = AutoTokenizer.from_pretrained(model_name)
        self.model = AutoModel.from_pretrained(model_name)
        self.model.eval()
        if device is None:
            device = "cuda" if torch.cuda.is_available() else "cpu"
        self.device = device
        self.model.to(self.device)
        self.normalize = normalize
        self.max_len = max_len

    @torch.no_grad()
    def encode_batch(self, texts: List[str], batch_size: int = 32) -> np.ndarray:
        embs = []
        for i in tqdm(range(0, len(texts), batch_size), desc="[encode] queries", unit="batch"):
            batch = texts[i:i+batch_size]
            tokd = self.tok(
                batch,
                return_tensors="pt",
                padding=True,
                truncation=True,
                max_length=self.max_len
            ).to(self.device)
            out = self.model(**tokd).last_hidden_state
            # DPR models usually use CLS pooling
            batch_emb = out[:, 0, :].cpu().numpy().astype(np.float32)
            embs.append(batch_emb)
        Q = np.vstack(embs)
        if self.normalize:
            faiss.normalize_L2(Q)
        return Q

# Eval
def compute_recall(qrels: Dict[str, Set[int]], qids: List[str], results: List[List[int]], pid2did: Dict[int, int], K: int):
    recalls, hits = [], []
    for qid, pids in zip(qids, results):
        gold = qrels.get(qid, set())
        if not gold:
            continue
        dids = {pid2did.get(int(pid), -1) for pid in pids if pid in pid2did}
        dids.discard(-1)
        inter = len(dids & gold)
        recalls.append(inter / len(gold))
        hits.append(1 if inter > 0 else 0)
    return float(np.mean(recalls)), float(np.mean(hits))

# Main
def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--index", required=True, help="Path to ivfpq_full.faiss")
    ap.add_argument("--queries", required=True, help="test.single-removed.direct.tsv")
    ap.add_argument("--qrels", required=True, help="qrels-doc.test.direct.tsv")
    ap.add_argument("--pid2did", required=True, help="mapping.pid2did.tsv")
    ap.add_argument("--model", default="jhu-clsp/LegalBERT-DPR-CLERC-ft")
    ap.add_argument("--topk", type=int, default=1000)
    ap.add_argument("--nprobe", type=int, default=256)
    ap.add_argument("--batch", type=int, default=64)
    ap.add_argument("--normalize", action="store_true")
    args = ap.parse_args()

    # load data
    pid2did = load_pid2did(args.pid2did)
    queries = load_queries(args.queries)
    qrels = load_qrels(args.qrels)
    print(f"[data] queries={len(queries)}, qrels={len(qrels)}")

    # load faiss index
    index = faiss.read_index(args.index)
    try:
        faiss.extract_index_ivf(index).nprobe = args.nprobe
    except Exception:
        if hasattr(index, "nprobe"):
            index.nprobe = args.nprobe

    # encoder
    enc = QueryEncoder(args.model, normalize=args.normalize)
    qids = [qid for qid, _ in queries]
    qtexts = [qt for _, qt in queries]
    Q = enc.encode_batch(qtexts, batch_size=args.batch)

    # search
    all_results = []
    for i in tqdm(range(0, len(Q), args.batch), desc="[search] faiss", unit="batch"):
        q_batch = Q[i:i+args.batch]
        D, I = index.search(q_batch, args.topk)
        for row in I:
            all_results.append(row.tolist())

    # eval
    mean_recall, hit_rate = compute_recall(qrels, qids, all_results, pid2did, args.topk)
    print("\n=========== RESULTS ===========")
    print(f"Recall@{args.topk}: {mean_recall:.4f}")
    print(f"Hit@{args.topk}   : {hit_rate:.4f}")
    print("===============================")

if __name__ == "__main__":
    main()
