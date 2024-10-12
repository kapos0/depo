import mongoose from "mongoose";
let isConnected = false;
export async function connectDB() {
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "photo_gallery",
    });

    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Failed to connect to MongoDB:", error);
  }
}
