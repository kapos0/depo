import express from "express";
import NotesRouter from "./NotesRoutes.js";
import { toNodeHandler } from "better-auth/node";
import { setupAuth, auth } from "../lib/auth.js";

const router = express.Router();
await setupAuth();
router.all("/auth/{*better-auth}", toNodeHandler(auth));
router.use("/note", NotesRouter);
export default router;
