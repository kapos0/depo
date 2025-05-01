import { notesMock } from "../lib/mocks";
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

export const useNotesStore = create<NotesState>((set, get) => ({
    notes: notesMock,
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

        if (!selectedNote) return;

        set({
            notes: notes.filter((note) => note.title !== selectedNote.title),
            selectedNoteId: null,
            selectedNote: null,
        });
    },
}));
