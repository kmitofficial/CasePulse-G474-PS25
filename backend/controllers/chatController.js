import fetch from "node-fetch";

// In-memory cache (simple, can be replaced with Redis/DB later)
const queryCache = new Map();

export const handleChat = async (req, res) => {
  try {
    const { query } = req.body;
    console.log("[DEBUG] Received query:", query);

    if (!query) {
      console.log("[DEBUG] No query provided");
      return res.status(400).json({ error: "Query is required" });
    }

    // Call FastAPI backend
    console.log("[DEBUG] Sending query to FastAPI...");
    const response = await fetch(
      "https://unsupernaturally-metaphrastic-tijuana.ngrok-free.dev/submit_query",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          jurisdiction: req.body.jurisdiction || "US",
          retrieval_model: req.body.retrieval_model || "bm25",
        }),
      }
    );

    console.log("[DEBUG] FastAPI response status:", response.status);

    if (!response.ok) throw new Error("Failed to fetch from FastAPI");

    const data = await response.json();
    console.log("[DEBUG] FastAPI response data:", data);

    let llmResponse = data.llm_generated?.legal_brief || "No legal brief generated";
    console.log("[DEBUG] LLM response extracted:", llmResponse.substring(0, 200), "...");

    const fusedFiles = data.fused_files || [];
    console.log("[DEBUG] Fused files:", fusedFiles);

    // Capture job_id and download_url
    const externalJob = data.external_responses?.[0];
    const jobId = externalJob?.job_id || null;
    console.log("[DEBUG] External job ID:", jobId);

    const downloadUrl = jobId
      ? `https://scarlett-uninsinuating-nonsyntonically.ngrok-free.app/download/${jobId}`
      : null;
    console.log("[DEBUG] Download URL:", downloadUrl);

    // If jobId exists, fetch JSONL file and append to reply
    if (downloadUrl) {
      console.log("[DEBUG] Attempting to fetch JSONL file from download URL...");
      try {
        const fileResponse = await fetch(downloadUrl);
        console.log("[DEBUG] JSONL file response status:", fileResponse.status);
        if (fileResponse.ok) {
          const jsonlText = await fileResponse.text();
          console.log("[DEBUG] JSONL file content length:", jsonlText.length);
          llmResponse += `\n\n---\nRetrieved JSONL file content from job ${jobId}:\n${jsonlText}`;
        } else {
          console.warn(`[WARN] Failed to download JSONL file from ${downloadUrl}`);
        }
      } catch (err) {
        console.error(`[ERROR] Could not fetch JSONL file: ${err.message}`);
      }
    } else {
      console.log("[DEBUG] No job ID, skipping JSONL download");
    }

    // Save fused_files in cache for later retrieval
    if (data.query_id) {
      console.log("[DEBUG] Saving fused_files in cache for query_id:", data.query_id);
      queryCache.set(data.query_id, fusedFiles);
    }

    res.json({
      reply: llmResponse,
      query_id: data.query_id,
      status: data.status,
      fused_files: fusedFiles,
      job_id: jobId,
      download_url: downloadUrl,
      full_response: data,
    });
    console.log("[DEBUG] Response sent to frontend");
  } catch (error) {
    console.error("Chat error:", error.message);
    res.status(500).json({ error: "Server error while processing chat" });
  }
};
