import express from "express";
import path from "path";
import postsRouter from "./routes/posts.js";
import htmlFileResponsesRouter from "./routes/htmlFileResponses.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/error.js";
import notFound from "./middleware/notFound.js";

const PORT = 8000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//logger
app.use(logger);

//actual paths
app.use("/", htmlFileResponsesRouter);
app.use("/api/posts", postsRouter);

//error handling
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
