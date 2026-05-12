import fetch from "node-fetch";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config(); 
// Groq Client
const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});
console.log(process.env.GROQ_API_KEY)

try {
  const test = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: "arey you awake?",
      }
    ],
    max_tokens: 20,
  });

  console.log(
    "GROQ WORKING:",
    test.choices[0].message.content
  );

} catch (err) {
  console.error("GROQ ERROR:", err);
}

// Simple in-memory cache
const queryCache = new Map();

export const handleChat = async (req, res) => {
  try {
    const {
      query,
      jurisdiction,
      retrieval_model,
      generation_llm,
    } = req.body;

    console.log("[DEBUG] Incoming Request:", req.body);

    // Validate query
    if (!query) {
      return res.status(400).json({
        error: "Query is required",
      });
    }

    /*
      ===================================================
      STEP 1: CALL HYBRID RETRIEVER API
      ===================================================
    */

    console.log("[DEBUG] Calling Hybrid Retriever...");

    const retrievalResponse = await fetch(
      "https://capital-sound-burro.ngrok-free.app/hybrid/search",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          jurisdiction,
          retrieval_model,
          generation_llm,
        }),
      }
    );

    console.log(
      "[DEBUG] Retriever Status:",
      retrievalResponse.status
    );

    if (!retrievalResponse.ok) {
      throw new Error("Retriever API failed");
    }

    const retrievalData = await retrievalResponse.json();

    console.log(
      "[DEBUG] Retriever Response:",
      retrievalData
    );

    /*
      ===================================================
      STEP 2: EXTRACT RAG PROMPT
      ===================================================
    */

    const ragPrompt = retrievalData.prompt;

    if (!ragPrompt) {
      throw new Error(
        "No prompt returned from retriever"
      );
    }

    console.log(
      "[DEBUG] Prompt Length:",
      ragPrompt.length
    );

    /*
      ===================================================
      STEP 3: SEND PROMPT TO GROQ LLAMA3
      ===================================================
    */

    console.log("[DEBUG] Sending prompt to Groq...");

    const completion =
      await client.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `
You are a professional legal AI assistant.

Your job is to:
- Analyze legal queries
- Explain relevant legal principles
- Use retrieved legal context carefully
- Provide structured legal reasoning
- Summarize relevant precedents if available
- Generate concise but professional legal analysis
            `,
          },
          {
            role: "user",
            content: ragPrompt,
          },
        ],

        temperature: 0.2,
        max_tokens: 1500,
      });

    /*
      ===================================================
      STEP 4: EXTRACT FINAL RESPONSE
      ===================================================
    */

    const finalReply =
      completion.choices?.[0]?.message?.content ||
      "No legal analysis generated";

    console.log(
      "[DEBUG] Final Response Length:",
      finalReply.length
    );

    /*
      ===================================================
      STEP 5: OPTIONAL CACHE
      ===================================================
    */

    const cacheId = Date.now().toString();

    queryCache.set(cacheId, {
      query,
      docs: retrievalData.docs || [],
      response: finalReply,
    });

    /*
      ===================================================
      STEP 6: SEND RESPONSE TO FRONTEND
      ===================================================
    */

    res.json({
      reply: finalReply,
      query_id: cacheId,
      top_k: retrievalData.top_k || 0,
      docs: retrievalData.docs || [],
      full_response: retrievalData,
    });

    console.log(
      "[DEBUG] Response sent successfully"
    );

  } catch (error) {
    console.error("[ERROR]", error);

    res.status(500).json({
      error:
        "Server error while generating legal analysis",
    });
  }
};