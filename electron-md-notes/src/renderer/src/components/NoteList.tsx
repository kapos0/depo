import { ComponentProps } from "react";
import { notesMock } from "../lib/mocks";
import { NotePreview } from "./NotePreview";
import { twMerge } from "tailwind-merge";

export function NoteList({ className, ...props }: ComponentProps<"ul">) {
    if (notesMock.length === 0)
        return (
            <ul className={twMerge("text-center pt-4", className)} {...props}>
                <span>No Notes Yet!</span>
            </ul>
        );
    return (
        <ul className={`border-t-1 p-2 ${className}`} {...props}>
            {notesMock.map((note) => (
                <NotePreview key={note.title + note.lastEditTime} {...note} />
            ))}
        </ul>
    );
}
