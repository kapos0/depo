import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { useNotesStore } from "../store/notesStore";

export const FloatingNoteTitle = ({
    className,
    ...props
}: ComponentProps<"div">) => {
    const selectedNote = useNotesStore((state) => state.selectedNote);
    return (
        <div className={twMerge("flex justify-center", className)} {...props}>
            <span className="text-gray-100">
                {selectedNote?.title || "not selected any"}
            </span>
        </div>
    );
};
