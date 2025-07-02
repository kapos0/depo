import { ObjectId } from "mongodb";
import { connectDB } from "../lib/connectDB.js";
import { checkNoteModel } from "../models/noteModel.js";

async function getNotesCollection() {
    const db = await connectDB();
    return db.collection("notes");
}

export async function getAllNotes(req, res) {
    try {
        const notesCollection = await getNotesCollection();
        const notes = await notesCollection
            .find({})
            .sort({ createdAt: -1 })
            .toArray();
        if (!notes || notes.length === 0)
            return res.status(404).json({ message: "No notes found" });
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error fetching all notes:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getNoteById(req, res) {
    const noteId = req.params.id;
    if (!noteId)
        return res.status(400).json({ message: "Note ID is required" });
    try {
        const notesCollection = await getNotesCollection();
        const note = await notesCollection.findOne({
            _id: new ObjectId(String(noteId)),
        });
        if (!note) return res.status(404).json({ message: "Note not found" });

        res.status(200).json(note);
    } catch (error) {
        console.error(`Error fetching note with ID ${noteId}:`, error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function createNote(req, res) {
    const note = req.body;
    if (!note || Object.keys(note).length === 0)
        return res.status(400).json({ message: "Note data is required" });
    try {
        checkNoteModel(note);
        const notesCollection = await getNotesCollection();
        const result = await notesCollection.insertOne({
            ...note,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        if (!result.acknowledged)
            return res.status(500).json({ message: "Failed to create note" });
        res.status(201).json({ message: "Note created successfully" });
    } catch (error) {
        console.error("Error creating note:", error);
        res.status(400).json({ message: error.message });
    }
}

export async function updateNote(req, res) {
    const noteId = req.params.id;
    const updatedNote = req.body;
    if (!noteId || !updatedNote || Object.keys(updatedNote).length === 0)
        return res
            .status(400)
            .json({ message: "Note ID and data are required" });
    try {
        checkNoteModel(updatedNote);
        const notesCollection = await getNotesCollection();
        const result = await notesCollection.updateOne(
            { _id: new ObjectId(String(noteId)) },
            { $set: { ...updatedNote, updatedAt: new Date() } }
        );
        if (result.matchedCount === 0)
            return res.status(404).json({ message: "Note not found" });
        res.status(200).json({ message: "Note updated successfully" });
    } catch (error) {
        console.error(`Error updating note with ID ${noteId}:`, error);
        res.status(400).json({ message: error.message });
    }
}

export async function deleteNote(req, res) {
    const noteId = req.params.id;
    if (!noteId)
        return res.status(400).json({ message: "Note ID is required" });
    try {
        const notesCollection = await getNotesCollection();
        const result = await notesCollection.deleteOne({
            _id: new ObjectId(String(noteId)),
        });
        if (result.deletedCount === 0)
            return res.status(404).json({ message: "Note not found" });
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        console.error(`Error deleting note with ID ${noteId}:`, error);
        res.status(500).json({ message: "Internal server error" });
    }
}
