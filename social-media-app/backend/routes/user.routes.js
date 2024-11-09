import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  getUserProfile,
  followorunfollowUser,
  getSuggestedUsers,
  updateUserProfile,
} from "../controllers/user.controllers.js";
const router = express.Router();

router.get("/profile/:username", protectRoute, getUserProfile);
router.get("/suggested", protectRoute, getSuggestedUsers);
router.post("/follow/:id", protectRoute, followorunfollowUser);
router.post("/update", protectRoute, updateUserProfile);

export default router;
