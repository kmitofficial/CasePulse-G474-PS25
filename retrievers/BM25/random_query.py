
import os
import sys
import csv
import json
import random
import subprocess
import tempfile

def load_queries(queries_tsv_path):
    """
    Load queries.tsv, which should have lines:
      query_id<TAB>query_text
    Returns a list of (query_id, query_text).
    """
    queries = []
    with open(queries_tsv_path, 'r', encoding='utf-8') as f:
        reader = csv.reader(f, delimiter='\t')
        for row in reader:
            if len(row) >= 2:
                queries.append((row[0], row[1]))
    return queries

def run_bm25_for_query(query_id, query_text, index_path, hits=25):
    """
    Run BM25 via Pyserini for one query, return raw TREC lines.
    """
    # 1. Write temp query TSV
    tf = tempfile.NamedTemporaryFile(mode='w', suffix='.tsv', delete=False)
    tf.write(f"{query_id}\t{query_text}\n")
    tf.flush()
    tf_name = tf.name
    tf.close()

    # 2. Prepare temp output
    of = tempfile.NamedTemporaryFile(mode='r', suffix='.trec', delete=False)
    trec_path = of.name
    of.close()

    # 3. Invoke Pyserini
    cmd = [
        "python", "-m", "pyserini.search.lucene",
        "--index", index_path,
        "--topics", tf_name,
        "--output", trec_path,
        "--bm25",
        "--hits", str(hits)
    ]
    subprocess.run(cmd, check=True)

    # 4. Read back TREC lines
    with open(trec_path, 'r', encoding='utf-8') as f:
        lines = [l.strip() for l in f if l.strip()]

    # 5. Cleanup temp query only (keep trec_path for output)
    os.unlink(tf_name)
    return trec_path, lines

def save_trec(lines, output_path):
    """
    Save the selected TREC lines to output_path.
    """
    with open(output_path, 'w', encoding='utf-8') as f:
        for line in lines:
            f.write(line + "\n")

def save_jsonl(lines, query_id, query_text, output_path):
    """
    From TREC lines, extract doc_id, rank, score,
    and write JSONL with fields:
      query_id, query, doc_id, rank, score
    """
    with open(output_path, 'w', encoding='utf-8') as f:
        for l in lines:
            parts = l.split()
            # Expected: qid Q0 docid rank score runname
            if len(parts) < 6:
                continue
            _, _, docid, rank, score, _ = parts[:6]
            obj = {
                "query_id": query_id,
                "query": query_text,
                "doc_id": docid,
                "rank": int(rank),
                "score": float(score)
            }
            f.write(json.dumps(obj) + "\n")

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python random_query_bm25.py QUERIES_TSV INDEX_PATH OUTPUT_DIR")
        sys.exit(1)

    queries_tsv = sys.argv[1]
    index_path = sys.argv[2]
    output_dir = sys.argv[3]

    os.makedirs(output_dir, exist_ok=True)

    # Load all queries
    all_queries = load_queries(queries_tsv)
    if not all_queries:
        print(f"No queries found in {queries_tsv}")
        sys.exit(1)

    # Pick one at random
    qid, qtext = random.choice(all_queries)
    print(f"Selected random query: {qid}")

    # Run BM25 (top 25)
    trec_temp, trec_lines = run_bm25_for_query(qid, qtext, index_path, hits=25)

    # Save TREC output
    trec_out = os.path.join(output_dir, f"{qid}.trec")
    save_trec(trec_lines, trec_out)
    print(f"TREC results saved to {trec_out}")

    # Save JSONL for reranking
    jsonl_out = os.path.join(output_dir, f"{qid}.jsonl")
    save_jsonl(trec_lines, qid, qtext, jsonl_out)
    print(f"JSONL for reranking saved to {jsonl_out}")