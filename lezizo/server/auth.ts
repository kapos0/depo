import "dotenv/config";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) throw new Error("MONGODB_URI is required to start auth.");
if (!mongoUri.startsWith("mongodb://") && !mongoUri.startsWith("mongodb+srv://")) {
  throw new Error("MONGODB_URI must start with mongodb:// or mongodb+srv://.");
}

export const mongoClient = new MongoClient(mongoUri);
const database = mongoClient.db(process.env.MONGODB_DB ?? "lezizo");

export const auth = betterAuth({
  database: mongodbAdapter(database),
  emailAndPassword: { enabled: true },
  user: {
    additionalFields: {
      displayName: { type: "string", required: false },
      dietaryPreference: { type: "string", required: false },
    },
  },
  trustedOrigins: [process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000"],
});
