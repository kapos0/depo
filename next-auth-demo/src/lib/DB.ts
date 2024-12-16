import mongoose from "mongoose"

let isConnected = false

export async function connectToDB() {
    mongoose.set("strictQuery", true)

    if (isConnected) {
        console.log("MongoDB is already connected")
        return
    }
    try {
        await mongoose.connect(process.env.MONGO_DB_URL!, {
            dbName: "next-auth-demo",
        })
        isConnected = true
        console.log("MongoDB connected")
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error)
    }
}
