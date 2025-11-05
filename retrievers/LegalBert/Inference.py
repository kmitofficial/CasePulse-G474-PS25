#!/usr/bin/env python3
import argparse
import faiss
import numpy as np
import torch
from transformers import AutoTokenizer, AutoModel
from typing import List, Tuple

class DenseSearcher:
    def __init__(self, model_name: str="jhu-clsp/LegalBERT-DPR-CLERC-ft", index_path: str = "LegalBert/index/ivfpq_full.faiss", nprobe: int = 256, normalize: bool = True):
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.model = AutoModel.from_pretrained(model_name)
        self.model.eval()
        if torch.cuda.is_available():
            self.model = self.model.cuda()

        self.index = faiss.read_index(index_path)
        self.index.nprobe = nprobe
        self.normalize = normalize

    def encode_query(self, query: str) -> np.ndarray:
        inputs = self.tokenizer(query, return_tensors="pt", truncation=True, max_length=512)
        if torch.cuda.is_available():
            inputs = {k: v.cuda() for k, v in inputs.items()}
        with torch.no_grad():
            outputs = self.model(**inputs)
            emb = outputs.last_hidden_state[:, 0, :].cpu().numpy().astype(np.float32)
        if self.normalize:
            faiss.normalize_L2(emb)
        return emb

    def search(self, query: str, topk: int = 5) -> List[Tuple[int, float]]:
        qvec = self.encode_query(query)
        D, I = self.index.search(qvec, topk)
        return list(zip(I[0].tolist(), D[0].tolist()))

def main():
    parser = argparse.ArgumentParser(description="Search FAISS dense index with a transformer encoder")
    parser.add_argument("--index", required=True, help="Path to FAISS index file")
    parser.add_argument("--model", required=True, help="HuggingFace model name or path")
    parser.add_argument("--query", required=True, help="Search query string")
    parser.add_argument("--topk", type=int, default=20, help="Number of hits to return")
    parser.add_argument("--nprobe", type=int, default=256, help="Number of probes for FAISS search")
    parser.add_argument("--normalize", action="store_true", help="Apply L2 normalization to embeddings")
    args = parser.parse_args()

    searcher = DenseSearcher(args.model, args.index, nprobe=args.nprobe, normalize=args.normalize)
    results = searcher.search(args.query, topk=args.topk)

    print("\n[RESULTS]")
    for rank, (pid, dist) in enumerate(results, start=1):
        print(f"{rank:02d} PassageID={pid} Distance={dist:.4f}")

if __name__ == "__main__":
    main()
