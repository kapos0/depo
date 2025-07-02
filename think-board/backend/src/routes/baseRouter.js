import express from "express";
import NotesRouter from "./notesRouter.js";

const router = express.Router();
router.use("/notes", NotesRouter);
router.get("/health", (req, res) => {
    res.json({ status: "OK" });
});
export default router;
