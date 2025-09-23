// routes/chatRoutes.js
import express from "express";
import { handleChat } from "../controllers/chatController.js";

const router = express.Router();

router.post("/submit_query", handleChat);

export default router;
