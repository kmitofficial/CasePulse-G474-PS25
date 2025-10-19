import express from "express";
import cors from "cors";
import chatRoute from "./routes/chatRoute.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Allow frontend calls
app.use(cors({
  origin: "https://casebridge-app.vercel.app/", // replace with your Vercel URL
  credentials: true
}));

app.use(express.json());

// Your API routes
app.use("/api", chatRoute);

// 404 handler (optional)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
