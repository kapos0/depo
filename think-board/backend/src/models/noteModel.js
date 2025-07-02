export function checkNoteModel(note) {
    if (!note || typeof note !== "object")
        throw new Error("Invalid note object");

    if (!note.title || typeof note.title !== "string")
        throw new Error("Note must have a title of type string");

    if (!note.content || typeof note.content !== "string")
        throw new Error("Note must have content of type string");

    if (note._id && typeof note._id !== "string")
        throw new Error("Note ID must be a string");

    if (note.createdAt && !(note.createdAt instanceof Date))
        throw new Error("createdAt must be a Date object");

    if (note.updatedAt && !(note.updatedAt instanceof Date))
        throw new Error("updatedAt must be a Date object");
}
