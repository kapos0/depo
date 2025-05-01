import { useNotesStore } from "../store/notesStore";

export function useMdEditor() {
    const selectedNote = useNotesStore((state) => state.selectedNote);
    return {
        selectedNote,
    };
}
