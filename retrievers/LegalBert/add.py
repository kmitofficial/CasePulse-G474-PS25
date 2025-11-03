#!/usr/bin/env python3
# add_ivfpq.py
import argparse, glob, os, sys
import numpy as np
import faiss
from tqdm import tqdm

def parse_args():
    ap = argparse.ArgumentParser(description="Add vectors to trained FAISS IVF-PQ index")
    ap.add_argument("--emb-glob", required=True, help="Glob for embeddings")
    ap.add_argument("--ids-glob", required=True, help="Glob for ids")
    ap.add_argument("--trained-index", required=True, help="Path to trained index")
    ap.add_argument("--out-index", default="index/ivfpq_full.faiss", help="Final output index path")
    ap.add_argument("--chunk", type=int, default=500_000, help="rows per add() batch")
    ap.add_argument("--threads", type=int, default=8)
    ap.add_argument("--normalize", action="store_true", help="L2-normalize vectors (cosine)")
    return ap.parse_args()

if __name__ == "__main__":
    args = parse_args()
    faiss.omp_set_num_threads(args.threads)

    emb_files = sorted(glob.glob(args.emb_glob))
    id_files  = sorted(glob.glob(args.ids_glob))
    if len(emb_files) != len(id_files):
        sys.exit("Embedding/ID file count mismatch")

    print(f"Loading trained index from {args.trained_index}")
    index = faiss.read_index(args.trained_index)

    total_added = 0
    for emb_f, id_f in zip(emb_files, id_files):
        X = np.load(emb_f, mmap_mode="r")
        I = np.load(id_f, mmap_mode="r")
        assert X.shape[0] == I.shape[0], f"Row mismatch in {emb_f} vs {id_f}"

        m = X.shape[0]
        for start in tqdm(range(0, m, args.chunk), desc=f"Adding {os.path.basename(emb_f)}", unit="rows"):
            end = min(start + args.chunk, m)
            xb = np.asarray(X[start:end], dtype=np.float32)
            if args.normalize:
                faiss.normalize_L2(xb)
            ids = np.asarray(I[start:end], dtype=np.int64)
            index.add_with_ids(xb, ids)
            total_added += (end - start)

        # Optional checkpoint
        faiss.write_index(index, args.out_index.replace(".faiss", "_partial.faiss"))

    faiss.write_index(index, args.out_index)
    print(f"[OK] Added total vectors: {total_added}")
    print(f"[OK] Final index written to {args.out_index}")
