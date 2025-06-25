import express from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth.js";
import NotesRouter from "./NotesRoutes.js";

const router = express.Router();

router.get("/note", NotesRouter);

router.get("/me", async (req, res) => {
    const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
    });
    res.json(session);
});

export default router;
