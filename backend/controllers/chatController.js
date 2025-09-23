// controllers/chatController.js
import fetch from "node-fetch";

export const handleChat = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    // Call the real API
    const response = await fetch("http://127.0.0.1:8000/submit_query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch from real API");
    }

    const data = await response.json();

    // Extract the LLM generated response correctly
    const llmResponse = data.llm_generated?.legal_brief || "No legal brief generated";
    
    res.json({ 
      reply: llmResponse,
      query_id: data.query_id,
      status: data.status,
      full_response: data // Include full response if needed
    });
  } catch (error) {
    console.error("Chat error:", error.message);
    res.status(500).json({ error: "Server error while processing chat" });
  }
};