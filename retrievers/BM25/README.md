# 🔍 BM25 Retrieval with CLERC

This repository provides scripts and resources for experimenting with **retrieval models** on the [CLERC dataset](https://huggingface.co/datasets/jhu-clsp/CLERC/tree/main). It includes a **prebuilt BM25 index**, runnable scripts, and a clean structure to extend with future neural retrievers.


## 🌟 Highlights

### Our Contribution
We provide a **ready-to-use BM25 index** for the CLERC dataset, saving researchers hours of preprocessing time:

🔗 **[Pre-built BM25 Index on Hugging Face](https://huggingface.co/HRITHIKRAJ2537H/bm25-clerc-pyserini)**

✨ **Key Features:**
- Fully indexed CLERC collection using Pyserini
- Optimized BM25 parameters (k1=1.2, b=0.75)
- Ready for immediate retrieval experiments
- Compatible with standard TREC evaluation tools

---

---

## 📂 Repository Structure

```
.
├── README.md                         # Documentation
├── requirements.txt                  # Python dependencies
├── random_query.py                   # Main script - Run random query against BM25 index
├── queries/
│   └── test.single-removed.direct.tsv  # Test queries dataset
├── indexes/
│   └── bm25_clerc_full/             # BM25 index directory (downloaded)
└── Output/                          # Results output directory
```

---

## 📥 Data & Index

### CLERC Collection
We use the CLERC passage dataset:  
👉 [CLERC Dataset (Hugging Face)](https://huggingface.co/datasets/jhu-clsp/CLERC/tree/main)

### BM25 Index
We provide a prebuilt Lucene BM25 index for CLERC passages:  
👉 [BM25 CLERC Index (Hugging Face)](https://huggingface.co/HRITHIKRAJ2537H/bm25-clerc-pyserini)

After downloading, place the index under:
```
indexes/bm25_clerc_full/
```

---

## ⚙️ Installation

Clone this repo:
```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```

Install dependencies:
```bash
pip install -r requirements.txt
```

---

## ▶️ Usage

Run a random query from your test queries against the BM25 index:

```bash
python random_query.py queries/test.single-removed.direct.tsv indexes/bm25_clerc_full Output
```

This will:
* Select a random query from `test.single-removed.direct.tsv`
* Retrieve top-25 documents using BM25
* Save results to the `Output/` directory as:
  * **TREC format** → `Output/{qid}.trec`
  * **JSONL format** → `Output/{qid}.jsonl`

### Output Format Examples

**TREC Format** (`Output/example_query.trec`):
```
query_id Q0 doc_123 1 15.234 BM25
query_id Q0 doc_456 2 14.876 BM25
query_id Q0 doc_789 3 13.542 BM25
```

**JSONL Format** (`Output/example_query.jsonl`):
```json
{"qid": "query_id", "docid": "doc_123", "rank": 1, "score": 15.234}
{"qid": "query_id", "docid": "doc_456", "rank": 2, "score": 14.876}
{"qid": "query_id", "docid": "doc_789", "rank": 3, "score": 13.542}
```

---

## 📊 Dataset Information

### CLERC Overview
- **Collection**: Cross-Lingual Evaluation for Retrieval Collections
- **Domain**: Multi-domain passages
- **Size**: Large-scale collection suitable for retrieval experiments
- **Languages**: Multiple languages supported
- **Format**: TSV with columns: `docid`, `text`, `title` (optional)

### Query Format
Queries are stored in `queries/test.single-removed.direct.tsv` with format:
```
qid	query_text
Q001	What is machine learning?
Q002	How does neural networks work?
Q003	Information retrieval methods
```

---

## 🔧 Configuration

### BM25 Parameters
Default BM25 settings (can be modified in the script):
- **k1**: 1.2 (term frequency saturation)
- **b**: 0.75 (length normalization)
- **Top-k**: 25 results per query

### Index Structure
The expected index structure after download:
```
indexes/bm25_clerc_full/
├── index-metadata.json
├── lucene-index.*.tar.gz
└── other Lucene index files
```



## 🛠️ Development

### Adding New Retrievers
1. Create a new script in the root directory or `retrievers/` folder
2. Follow the same interface pattern as `random_query.py`
3. Ensure consistent output format (TREC + JSONL)
4. Update requirements.txt if needed

### Testing
Run a quick test:
```bash
python random_query.py queries/test.single-removed.direct.tsv indexes/bm25_clerc_full Output --top-k 5
```

---

## 📋 Requirements

### System Requirements
- Python 3.8+
- Java 8+ (for Pyserini)
- ~50GB disk space for full index

### Python Dependencies
See `requirements.txt`:
```
pyserini>=0.21.0
pandas>=1.3.0
```



## 🔗 Useful Links

- [Pyserini Documentation](https://github.com/castorini/pyserini)
- [CLERC Dataset Paper](https://huggingface.co/datasets/jhu-clsp/CLERC)
- [Information Retrieval Resources](https://github.com/topics/information-retrieval)

---

## ❓ FAQ

### Q: How do I download the full index?
A: Visit the [Hugging Face repository](https://huggingface.co/HRITHIKRAJ2537H/bm25-clerc-pyserini) and use git-lfs or the web interface to download all files.

### Q: Can I use custom queries?
A: Yes! Just modify `queries/test.single-removed.direct.tsv` with your own queries in the same format, or create a new TSV file.

### Q: How do I evaluate retrieval quality?
A: You'll need relevance judgments (qrels). Use tools like `trec_eval` or `pytrec_eval` to compute metrics like MAP, nDCG, and Recall@k.


---

## 🚀 Quick Start

```bash
# 1. Clone and setup
git clone https://github.com/your-username/your-repo.git
cd your-repo
pip install -r requirements.txt

# 2. Download BM25 index from Hugging Face
# (Manual download to indexes/bm25_clerc_full/)

# 3. Run first query
python random_query.py queries/test.single-removed.direct.tsv indexes/bm25_clerc_full Output

# 4. Check results
ls Output/
cat Output/*.jsonl | head -5
```

**That's it!** 🎉 You're ready to start experimenting with retrieval on CLERC!