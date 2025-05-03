import { NoteInfo } from "@/shared/models";
import { create } from "zustand";
import { nanoid } from "nanoid";

type NotesState = {
    notes: NoteInfo[];
    selectedNoteId: string | null;
    selectedNote: NoteInfo | null;
    setSelectedNote: (NoteId: string | null) => void;
    createEmptyNote: () => Promise<void>;
    deleteNote: () => Promise<void>;
    saveNote: (newContent: string) => Promise<void>;
};

export const useNotesStore = create<NotesState>((set, get) => {
    async function initializeNotes() {
        const notes = await window.context.getNotes();
        if (!notes) return;
        const assignIdToNotes = notes.map((note: NoteInfo) => {
            return {
                ...note,
                NoteId: nanoid(),
            };
        });
        const sortedNotes = assignIdToNotes.sort(
            (a: NoteInfo, b: NoteInfo) => b.lastEditTime - a.lastEditTime
        );
        set({ notes: sortedNotes });
    }

    initializeNotes();

    return {
        notes: [],
        selectedNoteId: null,
        selectedNote: null,
        setSelectedNote: (NoteId) => {
            const notes = get().notes;
            const currentselectedNoteId = get().selectedNoteId;
            if (NoteId === currentselectedNoteId) return;
            const selectedNote =
                NoteId !== null
                    ? (notes.find((note) => note.NoteId === NoteId) ?? null)
                    : null;
            set({ selectedNoteId: NoteId, selectedNote });
        },
        createEmptyNote: async () => {
            const notes = get().notes;

            const newNote: NoteInfo = {
                NoteId: nanoid(),
                title: `New Note - ${nanoid(3)}`,
                content: "empty note",
                lastEditTime: Date.now(),
            };

            set({
                notes: [
                    newNote,
                    ...notes.filter((note) => note.title !== newNote.title),
                ],
                selectedNoteId: null,
                selectedNote: newNote,
            });
        },
        deleteNote: async () => {
            const notes = get().notes;
            const selectedNote = get().selectedNote;

            if (!selectedNote || !notes) return;
            await window.context.deleteNote(selectedNote.title);
            set({
                notes: notes.filter(
                    (note) => note.NoteId !== selectedNote.NoteId
                ),
                selectedNoteId: null,
                selectedNote: null,
            });
        },
        saveNote: async (newContent: string) => {
            const notes = get().notes;
            const selectedNote = get().selectedNote;
            if (!selectedNote || !notes) return;

            await window.context.writeNote(selectedNote.title, newContent);

            set({
                notes: notes.map((note) => {
                    if (note.NoteId === selectedNote.NoteId) {
                        return {
                            ...note,
                            lastEditTime: Date.now(),
                        };
                    }
                    return note;
                }),
                selectedNote: {
                    ...selectedNote,
                    lastEditTime: Date.now(),
                },
            });
        },
    };
});
