import express from "express";
import path from "path";
import postsRouter from "./routes/posts.js";
import htmlFileResponsesRouter from "./routes/htmlFileResponses.js";

const PORT = 8000;
const app = express();

app.use("/api/posts", postsRouter);
app.use("/api/posts/:id", postsRouter);
app.use("/", htmlFileResponsesRouter);
app.use("/about", htmlFileResponsesRouter);

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
