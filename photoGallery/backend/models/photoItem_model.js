import mongoose from "mongoose";

const photoItemSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const PhotoItem = mongoose.model("PhotoItem", photoItemSchema, "photos");
export default PhotoItem;
