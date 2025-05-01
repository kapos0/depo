import { useNotesStore } from "../store/notesStore";
import { useCallback } from "react";

export function useNotesList({ onSelect }: { onSelect?: () => void }) {
    const notes = useNotesStore((state) => state.notes);
    const selectedNoteIndex = useNotesStore((state) => state.selectedNoteIndex);
    const setSelectedNoteIndex = useNotesStore(
        (state) => state.setSelectedNoteIndex
    );

    const handleNoteSelect = useCallback(
        async (index: number) => {
            setSelectedNoteIndex(index);

            if (onSelect) onSelect();
        },
        [onSelect, setSelectedNoteIndex]
    );

    return {
        notes,
        selectedNoteIndex,
        handleNoteSelect,
    };
}
