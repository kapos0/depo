import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI_ATLAS, {
      dbName: "photo_gallery",
    });

    console.log("MongoDB connected");
  } catch (error) {
    console.log("Failed to connect to MongoDB:", error);
  }
}
