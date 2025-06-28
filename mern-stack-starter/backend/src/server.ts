import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import { fileURLToPath } from "url";
import { createProxyMiddleware } from "http-proxy-middleware";
import { connectDB } from "./lib/connectDB.js";
import BaseRouter from "./routes/base.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
    // Middleware
    app.use(express.json());

    if (NODE_ENV === "development") {
        console.log("🛠 Development mode: proxying to Vite frontend");
        app.use(helmet({ contentSecurityPolicy: false }));
        app.use(
            cors({
                origin: process.env.APP_URL,
                methods: ["GET", "POST", "PUT", "DELETE"],
                credentials: true,
            })
        );
        // API routes
        app.use("/api", BaseRouter);
        // Proxy non-API requests to Vite
        const viteProxy = createProxyMiddleware({
            target: process.env.VITE_URL,
            changeOrigin: true,
            ws: true,
        });
        app.use((req, res, next) => {
            if (!req.path.startsWith("/api")) viteProxy(req, res, next);
            else next();
        });
    } else {
        app.use(helmet());
        // Serve static frontend in production
        const frontendPath = path.join(__dirname, "../../frontend/dist");
        app.use(express.static(frontendPath));
        app.get("*", (_req: Request, res: Response) => {
            res.sendFile(path.join(frontendPath, "index.html"));
        });
        // API routes
        app.use("/api", BaseRouter);
    }

    connectDB().then(() => {
        app.listen(PORT, () => {
            console.log("Server started on PORT:", PORT);
        });
    });
}

startServer();
