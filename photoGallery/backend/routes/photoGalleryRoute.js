import express from "express";
const router = express.Router();

import {
  getAllPhotos,
  getPhotoById,
  postAPhoto,
  updateAPhoto,
  deleteAPhoto,
} from "../controllers/photoGalleryController.js";

router.get("/", getAllPhotos);
router.get("/:id", getPhotoById);
router.post("/", postAPhoto);
router.put("/:id", updateAPhoto);
router.delete("/:id", deleteAPhoto);

export default router;
