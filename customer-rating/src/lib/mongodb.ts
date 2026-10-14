import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
    throw new Error("MONGODB_URI is not configured.");
}

type MongoCache = {
    client: MongoClient;
    promise: Promise<MongoClient> | null;
};

const globalWithMongo = globalThis as typeof globalThis & {
    _mongoClient?: MongoCache;
};

const cached = globalWithMongo._mongoClient ?? {
    client: new MongoClient(uri),
    promise: null,
};

globalWithMongo._mongoClient = cached;

export const mongoClient = cached.client;

export async function connectMongoClient(): Promise<MongoClient> {
    if (!cached.promise) {
        cached.promise = cached.client.connect().catch((error: unknown) => {
            cached.promise = null;
            throw error;
        });
    }

    return cached.promise;
}
