import { FaRegTrashCan } from "react-icons/fa6";
import { ActionButton, ActionButtonProps } from "./ActionButton";

export function DeleteNoteButton({ ...props }: ActionButtonProps) {
    return (
        <ActionButton onClick={() => console.log("clicked")} {...props}>
            <FaRegTrashCan className="w-4 h-4 text-zinc-300" />
        </ActionButton>
    );
}
