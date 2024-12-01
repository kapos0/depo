import mongoose from "mongoose"

let isConnected = false

export async function connectToDB() {
    mongoose.set("strictQuery", true)
    try {
        if (!isConnected) {
            await mongoose.connect(process.env.MONGODB_URI_LOCAL!, {
                dbName: process.env.MONGODB_DB_NAME!,
            })
            isConnected = true
            console.log("Connected to DB")
        } else console.log("Already connected to DB")
    } catch (error) {
        console.error("Error connecting to DB", error)
    }
}
