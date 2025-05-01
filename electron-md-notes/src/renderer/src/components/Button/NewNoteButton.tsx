import { useNotesStore } from "@/renderer/store/notesStore";
import { ActionButton, ActionButtonProps } from "./ActionButton";
import { FaFileSignature } from "react-icons/fa6";

export function NewNoteButton({ ...props }: ActionButtonProps) {
    const { createEmptyNote } = useNotesStore((state) => ({
        createEmptyNote: state.createEmptyNote,
    }));
    function handleNewNote() {
        createEmptyNote();
    }
    return (
        <ActionButton onClick={handleNewNote} {...props}>
            <FaFileSignature className="w-4 h-4 text-zinc-300" />
        </ActionButton>
    );
}
