import { NoteInfo } from "@/shared/models";
import { create } from "zustand";
import { nanoid } from "nanoid";

type NotesState = {
    notes: NoteInfo[];
    selectedNoteId: string | null;
    selectedNote: NoteInfo | null;
    setSelectedNoteId: (NoteId: string | null) => void;
    createEmptyNote: () => Promise<void>;
    deleteNote: () => Promise<void>;
};

export const useNotesStore = create<NotesState>((set, get) => {
    async function initializeNotes() {
        const notes = await window.context.getNotes();
        if (!notes) return;
        const sortedNotes = notes.sort(
            (a: NoteInfo, b: NoteInfo) => b.lastEditTime - a.lastEditTime
        );
        set({ notes: sortedNotes });
    }

    initializeNotes();

    return {
        notes: [],
        selectedNoteId: null,
        selectedNote: null,
        setSelectedNoteId: (NoteId) => {
            const notes = get().notes;
            const currentselectedNoteId = get().selectedNoteId;

            // Prevent unnecessary updates if the index hasn't changed
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
                title: "New Note",
                content: "empty note",
                lastEditTime: 1,
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

            set({
                notes: notes.filter(
                    (note) => note.NoteId !== selectedNote.NoteId
                ),
                selectedNoteId: null,
                selectedNote: null,
            });
        },
    };
});
