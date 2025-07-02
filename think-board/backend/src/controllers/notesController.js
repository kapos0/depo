import { ObjectId } from "mongodb";
import { connectDB } from "../lib/connectDB.js";
import { checkNoteModel } from "../models/noteModel.js";
import { auth } from "../lib/auth.js";

async function getNotesCollection() {
    let db;
    try {
        db = await connectDB();
    } catch (error) {
        console.error("Error connecting to the database:", error);
        throw new Error("Database connection failed");
    }
    if (!db) throw new Error("Database connection is not established");

    return db.collection("notes");
}

async function getUserSession(req, res) {
    let session;
    try {
        session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers),
        });
    } catch (error) {
        console.error("Error fetching user session:", error);
        res.status(500).json({ message: "Internal server error" });
        return null;
    }
    return session;
}

export async function getAllUserNotes(req, res) {
    const session = await getUserSession(req, res);
    if (!session) return res.status(401).json({ message: "Unauthorized" });
    if (!session.user || !session.user.id)
        return res.status(400).json({ message: "User ID is required" });
    try {
        const notesCollection = await getNotesCollection();
        const notes = await notesCollection
            .find({ _id: new ObjectId(String(session.user.id)) })
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
    const session = await getUserSession(req, res);
    if (!session) return res.status(401).json({ message: "Unauthorized" });
    if (!session.user || !session.user.id)
        return res.status(400).json({ message: "User ID is required" });
    const noteId = req.params.id;
    if (!noteId)
        return res.status(400).json({ message: "Note ID is required" });
    try {
        const notesCollection = await getNotesCollection();
        const note = await notesCollection.findOne({
            _id: new ObjectId(String(noteId)),
            userId: new ObjectId(String(session.user.id)),
        });
        if (!note) return res.status(404).json({ message: "Note not found" });

        res.status(200).json(note);
    } catch (error) {
        console.error(`Error fetching note with ID ${noteId}:`, error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function createNote(req, res) {
    const session = await getUserSession(req, res);
    if (!session) return res.status(401).json({ message: "Unauthorized" });
    if (!session.user || !session.user.id)
        return res.status(400).json({ message: "User ID is required" });
    const note = { ...req.body, userId: session.user.id };
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
    const session = await getUserSession(req, res);
    if (!session) return res.status(401).json({ message: "Unauthorized" });
    if (!session.user || !session.user.id)
        return res.status(400).json({ message: "User ID is required" });
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
            {
                _id: new ObjectId(String(noteId)),
                userId: new ObjectId(String(session.user.id)),
            },
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
    const session = await getUserSession(req, res);
    if (!session) return res.status(401).json({ message: "Unauthorized" });
    if (!session.user || !session.user.id)
        return res.status(400).json({ message: "User ID is required" });
    const noteId = req.params.id;
    if (!noteId)
        return res.status(400).json({ message: "Note ID is required" });
    try {
        const notesCollection = await getNotesCollection();
        const result = await notesCollection.deleteOne({
            _id: new ObjectId(String(noteId)),
            userId: new ObjectId(String(session.user.id)),
        });
        if (result.deletedCount === 0)
            return res.status(404).json({ message: "Note not found" });
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        console.error(`Error deleting note with ID ${noteId}:`, error);
        res.status(500).json({ message: "Internal server error" });
    }
}
