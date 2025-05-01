import { notesMock } from "../lib/mocks";
import { NoteInfo } from "@/shared/models";
import { create } from "zustand";

type NotesState = {
    notes: NoteInfo[];
    selectedNoteIndex: number | null;
    selectedNote: NoteInfo | null;
    setSelectedNoteIndex: (index: number | null) => void;
    createEmptyNote: () => Promise<void>;
    deleteNote: () => Promise<void>;
};

export const useNotesStore = create<NotesState>((set, get) => ({
    notes: notesMock,
    selectedNoteIndex: null,
    selectedNote: null,
    setSelectedNoteIndex: (index) => {
        const notes = get().notes;
        const currentSelectedNoteIndex = get().selectedNoteIndex;

        // Prevent unnecessary updates if the index hasn't changed
        if (index === currentSelectedNoteIndex) return;

        const selectedNote =
            index !== null
                ? { ...notes[index], content: `Hello from Note ${index}` }
                : null;
        set({ selectedNoteIndex: index, selectedNote });
    },
    createEmptyNote: async () => {
        const notes = get().notes;

        const newNote: NoteInfo = {
            title: "New Note",
            content: "empty note",
            lastEditTime: 1,
        };

        set({
            notes: [
                newNote,
                ...notes.filter((note) => note.title !== newNote.title),
            ],
            selectedNoteIndex: null,
            selectedNote: newNote,
        });
    },

    deleteNote: async () => {
        const notes = get().notes;
        const selectedNote = get().selectedNote;

        if (!selectedNote) return;

        set({
            notes: notes.filter((note) => note.title !== selectedNote.title),
            selectedNoteIndex: null,
            selectedNote: null,
        });
    },
}));
