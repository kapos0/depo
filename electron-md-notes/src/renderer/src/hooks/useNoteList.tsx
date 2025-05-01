import { useNotesStore } from "../store/notesStore";
import { useCallback } from "react";

export function useNotesList({ onSelect }: { onSelect?: () => void }) {
    const notes = useNotesStore((state) => state.notes);
    const selectedNoteId = useNotesStore((state) => state.selectedNoteId);
    const setSelectedNoteId = useNotesStore((state) => state.setSelectedNoteId);

    const handleNoteSelect = useCallback(
        async (noteId: string) => {
            setSelectedNoteId(noteId);

            if (onSelect) onSelect();
        },
        [onSelect, setSelectedNoteId]
    );

    return {
        notes,
        selectedNoteId,
        handleNoteSelect,
    };
}
