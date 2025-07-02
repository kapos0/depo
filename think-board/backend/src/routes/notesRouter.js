import express from "express";
import {
    createNote,
    deleteNote,
    getAllUserNotes,
    getNoteById,
    updateNote,
} from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllUserNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
