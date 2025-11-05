#!/usr/bin/env python3
# build_ivfpq.py
import argparse, glob, os, sys
from typing import List, Tuple
import numpy as np
import faiss
from tqdm import tqdm

def parse_args():
    ap = argparse.ArgumentParser(description="Build OPQ+IVF-PQ FAISS index out-of-core")
    ap.add_argument("--emb-glob", required=True, help="Glob for embeddings, e.g. data/embeddings_*.npy")
    ap.add_argument("--ids-glob",  required=True, help="Glob for ids, e.g. data/ids_*.npy")
    ap.add_argument("--index-dir", default="index", help="Where to write index files")
    ap.add_argument("--train-size", type=int, default=500_000, help="training sample size")
    ap.add_argument("--nlist", type=int, default=16384, help="IVF cells")
    ap.add_argument("--M", type=int, default=96, help="PQ subquantizers")
    ap.add_argument("--nbits", type=int, default=8, help="PQ bits per subquantizer")
    ap.add_argument("--opq", action="store_true", help="use OPQ pretransform")
    ap.add_argument("--opqM", type=int, default=96, help="OPQ subspaces (usually = M)")
    ap.add_argument("--chunk", type=int, default=200_000, help="rows per add() batch")
    ap.add_argument("--threads", type=int, default=8, help="faiss omp threads")
    ap.add_argument("--normalize", action="store_true", help="L2-normalize vectors (use if cosine)")
    ap.add_argument("--seed", type=int, default=42)
    return ap.parse_args()

def list_pair(glob1: str, glob2: str) -> Tuple[List[str], List[str]]:
    efs = sorted(glob.glob(glob1))
    ifs = sorted(glob.glob(glob2))
    if not efs or not ifs:
        print("No files matched. Check your globs.", file=sys.stderr); sys.exit(1)
    if len(efs) != len(ifs):
        print("Embedding/ID file count mismatch.", file=sys.stderr); sys.exit(1)
    return efs, ifs

def get_dim(emb_path: str) -> int:
    X = np.load(emb_path, mmap_mode="r")
    if X.ndim != 2:
        raise ValueError(f"{emb_path} not 2D")
    return X.shape[1]

def proportional_sample(emb_files: List[str], total: int, seed: int, normalize: bool) -> np.ndarray:
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

def maybe_attach_ondisk_invlists(index) -> bool:
    """
    Attach OnDiskInvertedLists if available. Works for both IndexIVFPQ and IndexPreTransform(IndexIVFPQ).
    Returns True if attached, False otherwise.
    """
    # Extract the IVF part if the index is wrapped in a pretransform (OPQ)
    ivf = index
    try:
        ivf = faiss.extract_index_ivf(index)  # returns the IVF inside a pretransform, else raises
    except Exception:
        pass

    try:
        code_size = ivf.pq.code_size
        nlist = ivf.nlist
        invlists_path = os.path.join(args.index_dir, "ivf_invlists.bin")
        ondisk = faiss.OnDiskInvertedLists(nlist, code_size, invlists_path)
        ivf.replace_invlists(ondisk)
        ivf.own_invlists = True
        print(f"[OK] On-disk inverted lists -> {invlists_path}")
        return True
    except Exception as e:
        print(f"[WARN] OnDiskInvertedLists not available in your FAISS build: {e}")
        print("       Proceeding with in-memory inverted lists (still chunked).")
        return False

def build_index(d: int, Xtrain: np.ndarray, nlist: int, M: int, nbits: int, use_opq: bool, opqM: int):
    quantizer = faiss.IndexFlatL2(d)
    ivfpq = faiss.IndexIVFPQ(quantizer, d, nlist, M, nbits)

    if use_opq:
        opq = faiss.OPQMatrix(d, opqM)
        # Wrap with pretransform so queries/data pass through OPQ -> IVFPQ
        index = faiss.IndexPreTransform(opq, ivfpq)
    else:
        index = ivfpq

    print("[*] Training index...")
    index.train(Xtrain)  # trains OPQ (if present) + IVF + PQ
    return index

if __name__ == "__main__":
    args = parse_args()
    os.makedirs(args.index_dir, exist_ok=True)
    faiss.omp_set_num_threads(args.threads)

    emb_files, id_files = list_pair(args.emb_glob, args.ids_glob)
    d = get_dim(emb_files[0])
    print(f"Embedding dimension d={d}")
    print(f"Training with {args.train_size} vectors (proportional sampling across {len(emb_files)} shards)")

    Xtrain = proportional_sample(emb_files, args.train_size, args.seed, args.normalize)
    print("Training set shape:", Xtrain.shape)

    index = build_index(d, Xtrain, args.nlist, args.M, args.nbits, args.opq, args.opqM)
    trained_path = os.path.join(args.index_dir, "ivfpq_trained.faiss")
    faiss.write_index(index, trained_path)
    print(f"[OK] Wrote trained index to {trained_path}")

    # Try to attach on-disk inverted lists (recommended for 25M scale)
    attached = maybe_attach_ondisk_invlists(index)

    print("[*] Adding vectors in chunks...")
    total_added = 0
    for emb_f, id_f in zip(emb_files, id_files):
        X = np.load(emb_f, mmap_mode="r")
        I = np.load(id_f,  mmap_mode="r")
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

        # Optional: snapshot after each shard (defensive)
        snap_path = os.path.join(args.index_dir, "ivfpq_partial.faiss")
        faiss.write_index(index, snap_path)

    full_path = os.path.join(args.index_dir, "ivfpq_full.faiss")
    faiss.write_index(index, full_path)
    print(f"[OK] Added total vectors: {total_added}")
    print(f"[OK] Final index written to {full_path}")
    if attached:
        print(f"[OK] Inverted lists stored on-disk at: {os.path.join(args.index_dir, 'ivf_invlists.bin')}")
