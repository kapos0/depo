import express from "express";

const NotesRouter = express.Router();

NotesRouter.get("/", () => {
    /*AllNotes*/
});
NotesRouter.get("/:id", () => {
    /*SingleNote*/
});
NotesRouter.post("/", () => {
    /*CreateNote*/
});
NotesRouter.put("/:id", () => {
    /*UpdateNote*/
});
NotesRouter.delete("/:id", () => {
    /*DeleteNote*/
});

export default NotesRouter;
