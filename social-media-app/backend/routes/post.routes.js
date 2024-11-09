import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  getAllPosts,
  getLikedPosts,
  createPost,
  getFollowingPosts,
  getUserPosts,
  likeorunlikePost,
  commentOnPost,
  deletePost,
} from "../controllers/post.controllers.js";

const router = express.Router();

router.get("/all", protectRoute, getAllPosts);
router.get("/user/:username", protectRoute, getUserPosts);
router.get("/following", protectRoute, getFollowingPosts);
router.get("/likes/:id", protectRoute, getLikedPosts);
router.post("/comment/:id", protectRoute, commentOnPost);
router.post("/like/:id", protectRoute, likeorunlikePost);
router.post("/create", protectRoute, createPost);
router.delete("/:id", protectRoute, deletePost);

export default router;
