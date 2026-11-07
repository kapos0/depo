import "dotenv/config";
import { MongoClient } from "mongodb";
import { recipes } from "../src/data/recipes";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is required.");
if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
  throw new Error("MONGODB_URI must start with mongodb:// or mongodb+srv://. Replace the masked value in .env.");
}

const client = new MongoClient(uri);
const database = client.db(process.env.MONGODB_DB ?? "lezizo");

async function seed() {
  try {
    await client.connect();
    const collection = database.collection("recipes");
    await collection.createIndex({ name: "text", description: "text", tags: "text", ingredients: "text" });
    await collection.bulkWrite(recipes.map((recipe) => ({
      replaceOne: { filter: { id: recipe.id }, replacement: { ...recipe, seededAt: new Date() }, upsert: true },
    })));
    console.log(`Seeded ${recipes.length} recipes into ${database.databaseName}.recipes`);
  } finally {
    await client.close();
  }
}

void seed();
