import { connectDB } from "../lib/connectDB";

export async function getCollection(collectionName: string) {
    const db = await connectDB();
    return db.collection(collectionName);
}
