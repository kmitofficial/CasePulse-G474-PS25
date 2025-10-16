import fetch from "node-fetch";

// In-memory cache (simple, can be replaced with Redis/DB later)
const queryCache = new Map();

export const handleChat = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    // Call FastAPI backend once
    const response = await fetch("http://127.0.0.1:8000/submit_query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
  query,
  jurisdiction: req.body.jurisdiction || "US", // default to US
  retrieval_model: req.body.retrieval_model || "bm25",
})
    });

    if (!response.ok) {
      throw new Error("Failed to fetch from FastAPI");
    }

    const data = await response.json();

    const llmResponse = data.llm_generated?.legal_brief || "No legal brief generated";
    const fusedFiles = data.fused_files || [];

    //  Save fused_files in cache for later retrieval
    if (data.query_id) {
      queryCache.set(data.query_id, fusedFiles);
    }

    res.json({
      reply: llmResponse,
      query_id: data.query_id,
      status: data.status,
      fused_files: fusedFiles,
      full_response: data,
    });
  } catch (error) {
    console.error("Chat error:", error.message);
    res.status(500).json({ error: "Server error while processing chat" });
  }
};

// New endpoint to get fused files without new API call
export const getFusedFiles = (req, res) => {
  try {
    const { query_id } = req.params;

    if (!query_id) {
      return res.status(400).json({ error: "query_id is required" });
    }

    const fusedFiles = queryCache.get(query_id);

    if (!fusedFiles) {
      return res.status(404).json({ error: "No fused files found for this query_id" });
    }

    res.json({
      query_id,
      fused_files: fusedFiles,
    });
  } catch (error) {
    console.error("Get fused files error:", error.message);
    res.status(500).json({ error: "Server error while fetching fused files" });
  }
};
