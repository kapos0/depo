type NoteType = {
    title: string;
    content: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
};

export function checkNoteType(note: NoteType): boolean {
    return (
        typeof note === "object" &&
        note !== null &&
        typeof note.title === "string" &&
        typeof note.content === "string" &&
        Array.isArray(note.tags) &&
        note.tags.every((tag) => typeof tag === "string") &&
        note.createdAt instanceof Date &&
        note.updatedAt instanceof Date
    );
}
