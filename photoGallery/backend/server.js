import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import photoGalleryRoute from "./routes/photoGalleryRoute.js";

dotenv.config();
const PORT = process.env.PORT || 8080;
const __dirname = path.resolve();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/gallery", photoGalleryRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
}
app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
  connectDB();
});
