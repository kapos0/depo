import express from "express";
import dotenv from "dotenv";
import path from "path";
import helmet from "helmet";
import cors from "cors";
import { fileURLToPath } from "url";
import { createProxyMiddleware } from "http-proxy-middleware";
import { connectDB } from "./lib/connectDB.js";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import BaseRouter from "./routes/baseRouter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const IS_DEV = process.env.IS_DEV === "development";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.all("/api/auth/*any", toNodeHandler(auth));

app.use(express.json());

if (IS_DEV) {
    console.log("🛠 Development mode: proxying to Vite frontend");
    app.use(helmet({ contentSecurityPolicy: false }));
    app.use(
        cors({
            origin: process.env.VITE_URL,
            methods: ["GET", "POST", "PUT", "DELETE"],
            credentials: true,
        })
    );
    // Proxy non-API requests to Vite
    const viteProxy = createProxyMiddleware({
        target: process.env.VITE_URL,
        changeOrigin: true,
        ws: true,
    });
    app.use((req, res, next) => {
        if (!req.path.startsWith("/api")) return viteProxy(req, res, next);
        next();
    });
} else {
    app.use(helmet());
    const frontendPath = path.join(__dirname, "../../frontend/dist");
    app.use(express.static(frontendPath));
    app.get("*", (_req, res) => {
        res.sendFile(path.join(frontendPath, "index.html"));
    });
}

app.use("/api", BaseRouter);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on PORT: ${PORT}`);
    });
});
