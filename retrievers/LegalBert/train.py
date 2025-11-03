#!/usr/bin/env python3
# train_ivfpq.py
import argparse, glob, os, sys
import numpy as np
import faiss

def parse_args():
    ap = argparse.ArgumentParser(description="Train OPQ+IVF-PQ FAISS index")
    ap.add_argument("--emb-glob", required=True, help="Glob for embeddings, e.g. data/embeddings_*.npy")
    ap.add_argument("--train-size", type=int, default=500_000, help="training sample size")
    ap.add_argument("--nlist", type=int, default=16384, help="IVF cells")
    ap.add_argument("--M", type=int, default=96, help="PQ subquantizers")
    ap.add_argument("--nbits", type=int, default=8, help="PQ bits per subquantizer")
    ap.add_argument("--opq", action="store_true", help="use OPQ pretransform")
    ap.add_argument("--opqM", type=int, default=96, help="OPQ subspaces (usually = M)")
    ap.add_argument("--normalize", action="store_true", help="L2-normalize vectors (cosine sim)")
    ap.add_argument("--seed", type=int, default=42)
    ap.add_argument("--out", default="index/ivfpq_trained.faiss", help="output trained index path")
    return ap.parse_args()

def proportional_sample(emb_files, total, seed, normalize):
    rng = np.random.default_rng(seed)
    lens = [np.load(f, mmap_mode="r").shape[0] for f in emb_files]
    N = sum(lens)
    per = [max(1, int(total * (L / N))) for L in lens]
    samples = []
    for f, n in zip(emb_files, per):
        X = np.load(f, mmap_mode="r")
        m = X.shape[0]
        take = min(n, m)
        idx = rng.choice(m, size=take, replace=False)
        block = np.array(X[idx], dtype=np.float32, copy=True)
        if normalize:
            faiss.normalize_L2(block)
        samples.append(block)
    return np.concatenate(samples, axis=0)

def build_index(d, nlist, M, nbits, use_opq, opqM):
    quantizer = faiss.IndexFlatL2(d)
    ivfpq = faiss.IndexIVFPQ(quantizer, d, nlist, M, nbits)
    if use_opq:
        opq = faiss.OPQMatrix(d, opqM)
        index = faiss.IndexPreTransform(opq, ivfpq)
    else:
        index = ivfpq
    return index

if __name__ == "__main__":
    args = parse_args()
    os.makedirs(os.path.dirname(args.out), exist_ok=True)

    emb_files = sorted(glob.glob(args.emb_glob))
    if not emb_files:
        sys.exit("No embedding files matched")

    d = np.load(emb_files[0], mmap_mode="r").shape[1]
    print(f"Embedding dimension d={d}")
    print(f"Sampling {args.train_size} vectors across {len(emb_files)} shards")

    Xtrain = proportional_sample(emb_files, args.train_size, args.seed, args.normalize)
    print("Training set shape:", Xtrain.shape)

    index = build_index(d, args.nlist, args.M, args.nbits, args.opq, args.opqM)

    print("[*] Training index...")
    index.train(Xtrain)

    faiss.write_index(index, args.out)
    print(f"[OK] Trained index written to {args.out}")
