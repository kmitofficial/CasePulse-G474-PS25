import gzip
import torch
import numpy as np
from transformers import AutoTokenizer, AutoModel
from tqdm import tqdm

PASSAGE_FILE = "collection.passage.split1.tsv.gz"
MODEL_NAME = "jhu-clsp/LegalBERT-DPR-CLERC-ft"
BATCH_SIZE = 4096
EMBEDDINGS_SAVE_PATH = "passage_embeds1.npy"
IDS_SAVE_PATH = "passage_ids1.npy"
MAX_LENGTH = 256

# 1. SET DEVICE & CUDNN BENCHMARK
device = 'cuda' if torch.cuda.is_available() else 'cpu'
torch.backends.cudnn.benchmark = True
print(f"Using device: {device}")

# 2. LOAD MODEL AND TOKENIZER (USE FP16)
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModel.from_pretrained(MODEL_NAME).half().to(device)
model.eval()

# 3. ENCODING LOOP WITH OPTIMIZATIONS
passage_ids = []
embeddings_list = []
batch_pids, batch_texts = [], []

with torch.no_grad(), gzip.open(PASSAGE_FILE, 'rt', encoding='utf-8') as f:
    for line in tqdm(f, desc="Encoding Passages"):
        pid, text = line.strip().split('\t', 1)
        batch_pids.append(pid)
        batch_texts.append(text)
        if len(batch_texts) == BATCH_SIZE:
            inputs = tokenizer(batch_texts, padding=True, truncation=True, max_length=MAX_LENGTH, return_tensors="pt")
            inputs = {k: v.to(device) for k, v in inputs.items()}
            # FP16 for all float tensors
            inputs = {k: v.half() if v.dtype == torch.float32 else v for k, v in inputs.items()}
            outputs = model(**inputs).last_hidden_state[:, 0, :].cpu().numpy()
            embeddings_list.append(outputs)
            passage_ids.extend(batch_pids)
            batch_pids.clear()
            batch_texts.clear()
    # Handle last batch
    if batch_texts:
        inputs = tokenizer(batch_texts, padding=True, truncation=True, max_length=MAX_LENGTH, return_tensors="pt")
        inputs = {k: v.to(device) for k, v in inputs.items()}
        inputs = {k: v.half() if v.dtype == torch.float32 else v for k, v in inputs.items()}
        outputs = model(**inputs).last_hidden_state[:, 0, :].cpu().numpy()
        embeddings_list.append(outputs)
        passage_ids.extend(batch_pids)

# 4. CONCAT AND SAVE
embeddings = np.concatenate(embeddings_list, axis=0)
np.save(EMBEDDINGS_SAVE_PATH, embeddings)
np.save(IDS_SAVE_PATH, np.array(passage_ids))

print(f"Saved embeddings: {embeddings.shape} to {EMBEDDINGS_SAVE_PATH}")
print(f"Saved passage IDs: {len(passage_ids)} to {IDS_SAVE_PATH}")