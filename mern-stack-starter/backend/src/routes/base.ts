import express from "express";
import { toNodeHandler } from "better-auth/node";
import { setupAuth, auth } from "../lib/auth.js";

const router = express.Router();
await setupAuth();
router.all("/auth/{*better-auth}", toNodeHandler(auth));
export default router;
