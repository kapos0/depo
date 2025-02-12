import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import { connectDB } from "./lib/connectDB.js";

import productRoutes from "./routes/productRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json()); //This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.

app.use(cors()); //CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

app.use(helmet()); //helmet is a collection of 14 smaller middleware functions that set security-related HTTP headers
app.use(morgan("dev")); //HTTP request logger middleware for node.js

app.use("/api/products", productRoutes);
//initDB ye ihtiyacım varmı bilmiyorum bence yok
async function initDB() {
    try {
        const result = await connectDB();
        return result;
    } catch (error) {
        console.error("Error: ", error);
    }
}

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`);
    });
});
