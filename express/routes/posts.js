import express from "express";
const router = express.Router();

const posts = [
  { id: 1, title: "Post One", content: "This is post one" },
  { id: 2, title: "Post Two", content: "This is post two" },
  { id: 3, title: "Post Third", content: "This is post Third" },
  { id: 4, title: "Post Four", content: "This is post Four" },
  { id: 5, title: "Post Five", content: "This is post Five" },
  { id: 6, title: "Post Six", content: "This is post Six" },
  { id: 7, title: "Post Seven", content: "This is post Seven" },
];

router.get("/", (req, res) => {
  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) res.status(200).json(posts.slice(0, limit));
  else res.status(200).json(posts);
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id - 1);
  const post = posts[id];
  if (!post) res.status(404).json({ message: "Post not found" });
  else res.status(200).json(post);
});

export default router;
