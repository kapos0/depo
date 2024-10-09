import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import postsRouter from "./routes/posts.js";

import logger from "./middleware/logger.js";
import errorHandler from "./middleware/error.js";
import notFound from "./middleware/notFound.js";

const PORT = 8000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//logger
app.use(logger);

app.use("/api/posts", postsRouter);

//error handling
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
