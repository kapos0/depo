import { useNotesStore } from "../store/notesStore";

export function useNotesList({ onSelect }: { onSelect?: () => void }) {
    const notes = useNotesStore((state) => state.notes);
    const selectedNoteIndex = useNotesStore((state) => state.selectedNoteIndex);
    const setSelectedNoteIndex = useNotesStore(
        (state) => state.setSelectedNoteIndex
    );

    async function handleNoteSelect(index: number) {
        setSelectedNoteIndex(index);

        if (onSelect) onSelect();
    }

    return {
        notes,
        selectedNoteIndex,
        handleNoteSelect,
    };
}
