import mongoose from "mongoose";
let isConnected = false;
export async function connectToDB() {
    mongoose.set("strictQuery", true);
    mongoose.set("strictPopulate", false); //!!! IMPORTANT REMOVE İN THE PRODUCTION
    if (isConnected) {
        console.log("MongoDB is already connected");
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        isConnected = true;
        console.log("MongoDB connected");
    } catch (error) {
        console.log("Failed to connect to MongoDB:", error);
    }
}
