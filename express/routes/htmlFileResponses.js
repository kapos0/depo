import express from "express";
import path from "path";
const router = express.Router();
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

router.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "about.html"));
});

export default router;
