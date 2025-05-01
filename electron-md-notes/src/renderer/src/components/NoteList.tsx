import { ComponentProps } from "react";
import { notesMock } from "../lib/mocks";
import { NotePreview } from "./NotePreview";
import { twMerge } from "tailwind-merge";
import { useNotesList } from "../hooks/useNoteList";

export type NoteListProps = ComponentProps<"ul"> & {
    onSelect?: () => void;
};

export function NoteList({ onSelect, className, ...props }: NoteListProps) {
    const { notes, selectedNoteIndex, handleNoteSelect } = useNotesList({
        onSelect,
    });
    if (notes.length === 0)
        return (
            <ul className={twMerge("text-center pt-4", className)} {...props}>
                <span>No Notes Yet!</span>
            </ul>
        );
    return (
        <ul className={`border-t-1 p-2 ${className}`} {...props}>
            {notes.map((note, index) => (
                <NotePreview
                    key={note.title + note.lastEditTime}
                    {...note}
                    isActive={selectedNoteIndex === index}
                    onClick={() => handleNoteSelect(index)}
                />
            ))}
        </ul>
    );
}
