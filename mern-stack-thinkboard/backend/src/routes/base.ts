import express from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth.js";

const router = express.Router();

router.get("/", (req, res) => {
    console.log("Base route accessed");
    res.send("Base route accessed");
});

router.get("/api/me", async (req, res) => {
    const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
    });
    res.json(session);
});

export default router;
