import express from "express";
import NotesRouter from "./notesRouter.js";

const router = express.Router();
router.all("/notes", NotesRouter);
router.get("/", (req, res) => {
    res.json({ message: "Welcome to the API!" });
});
router.get("/health", (req, res) => {
    res.json({ status: "OK" });
});
export default router;
