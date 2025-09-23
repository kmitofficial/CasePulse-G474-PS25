import express from "express";
import { handleChat, getFusedFiles } from "../controllers/chatController.js";

const router = express.Router();

// Main chat endpoint (calls FastAPI once)
router.post("/submit_query", handleChat);

//  Retrieve fused files later by query_id
router.get("/fused_files/:query_id", getFusedFiles);

export default router;
