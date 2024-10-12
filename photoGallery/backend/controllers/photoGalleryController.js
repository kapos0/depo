import mongoose from "mongoose";
import PhotoItem from "../models/photoItem_model.js";

export async function getAllPhotos(req, res) {
  try {
    const photos = await PhotoItem.find(); //find icini bos birakirsaniz tum datalari getirir
    res.status(200).json({ success: true, data: photos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

export async function getPhotoById(req, res) {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ success: false, message: "Invalid id" });
  try {
    const photo = await PhotoItem.findById(id);
    if (!photo)
      return res
        .status(404)
        .json({ success: false, message: "Photo not found" });
    res.status(200).json({ success: true, data: photo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

export async function postAPhoto(req, res) {
  const photo_item = req.body;
  if (!photo_item.title || !photo_item.price || !photo_item.image)
    return res
      .status(400)
      .json({ success: false, message: "Title, image and price are required" });

  const newItem = await PhotoItem.create(photo_item);
  try {
    await newItem.save();
    res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

export async function updateAPhoto(req, res) {
  const id = req.params.id;
  const photo_item = req.body;
  if (!photo_item.title || !photo_item.price || !photo_item.image)
    return res
      .status(400)
      .json({ success: false, message: "Title, image and price are required" });
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ success: false, message: "Invalid id" });
  try {
    const updatedPhotoItem = await PhotoItem.findByIdAndUpdate(id, photo_item, {
      new: true,
    }); //new:true ile guncellenen datayi dondurur
    res.status(200).json({ success: true, data: updatedPhotoItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

export async function deleteAPhoto(req, res) {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ success: false, message: "Invalid id" });
  try {
    await PhotoItem.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Photo deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}
