import express from "express";
const router = express.Router();

import {
  getPosts,
  getSinglePost,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";

router.get("/", getPosts);
router.get("/:id", getSinglePost);
router.post("/create", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
