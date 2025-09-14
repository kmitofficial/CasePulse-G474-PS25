import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files
app.use(express.static(path.join(__dirname, "../dist")));

// Fallback: send index.html for any other route
app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});
