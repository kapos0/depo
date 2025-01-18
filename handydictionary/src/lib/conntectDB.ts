import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
    mongoose.set("strictQuery", true);

    if (isConnected) {
        console.log("MongoDB is already connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI!, {
            dbName: "handydictionaryDB",
        });

        isConnected = true;
        console.log("MongoDB connected");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
}
