import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
let client = null;

export async function connectDB() {
    if (!process.env.MONGODB_URI || !process.env.MONGODB_DB_NAME) {
        throw new Error("MONGODB_URI or MONGODB_DB_NAME not defined");
    }

    if (client) return client.db(process.env.MONGODB_DB_NAME);

    try {
        client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
        console.log("MongoDB connected");
        return client.db(process.env.MONGODB_DB_NAME);
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        throw new Error("Failed to connect to MongoDB");
    }
}
