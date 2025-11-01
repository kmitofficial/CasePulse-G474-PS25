import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import chatRoute from "./routes/chatRoute.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "*", // for production, replace with your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json()); 

app.use("/", chatRoute);

// Serve static files
app.use(express.static(path.join(__dirname, "../app/dist")));

// Fallback: send index.html for any other route
// Changed from "*" to /.*/ (regex)
app.get(/.*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, "../app/dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});