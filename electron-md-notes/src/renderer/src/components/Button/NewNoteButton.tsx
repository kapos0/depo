import { ActionButton, ActionButtonProps } from "./ActionButton";
import { FaFileSignature } from "react-icons/fa6";

export function NewNoteButton({ ...props }: ActionButtonProps) {
    return (
        <ActionButton onClick={() => console.log("clicked")} {...props}>
            <FaFileSignature className="w-4 h-4 text-zinc-300" />
        </ActionButton>
    );
}
