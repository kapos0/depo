import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import { fileURLToPath } from "url";
import { createProxyMiddleware } from "http-proxy-middleware";
import { connectDB } from "./lib/connectDB.js";
import BaseRouter from "./routes/base.js";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.all("/api/auth/{*any}", toNodeHandler(auth));
app.use(express.json());

if (NODE_ENV === "development") {
    console.log("🛠 Development mode: proxying to Vite frontend");
    if (process.env.NODE_ENV !== "production") {
        app.use(
            helmet({
                contentSecurityPolicy: false,
            })
        );
    } else app.use(helmet());

    app.use(
        cors({
            origin: process.env.APP_URL,
            methods: ["GET", "POST", "PUT", "DELETE"],
            credentials: true,
        })
    );

    app.get("/api", BaseRouter);

    const viteProxy = createProxyMiddleware({
        target: "http://localhost:5173",
        changeOrigin: true,
        ws: true,
    });

    app.use((req, res, next) => {
        if (!req.path.startsWith("/api")) {
            viteProxy(req, res, next);
        } else {
            next();
        }
    });
} else {
    const frontendPath = path.join(__dirname, "../../frontend/dist");
    app.use(express.static(frontendPath));
    app.get("*", (_req: Request, res: Response) => {
        res.sendFile(path.join(frontendPath, "index.html"));
    });
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT:", PORT);
    });
});
