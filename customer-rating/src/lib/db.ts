import mongoose from "mongoose";

type MongooseCache = {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
};

const globalWithMongoose = globalThis as typeof globalThis & {
    _mongoose?: MongooseCache;
};

const cached = globalWithMongoose._mongoose ?? {
    conn: null,
    promise: null,
};

globalWithMongoose._mongoose = cached;

export async function connectToDatabase(): Promise<typeof mongoose> {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
        throw new Error("MONGODB_URI is not configured.");
    }

    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose
            .connect(uri, { dbName: process.env.MONGODB_DB_NAME ?? "active" })
            .catch((error: unknown) => {
                cached.promise = null;
                throw error;
            });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}
