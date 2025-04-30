import {
    CreateNote,
    DeleteNote,
    GetNotes,
    ReadNote,
    WriteNote,
} from "@/shared/types";

declare global {
    interface Window {
        context: {
            locale: string;
            getNotes: (...args: Parameters<GetNotes>) => ReturnType<GetNotes>;
            readNote: (...args: Parameters<ReadNote>) => ReturnType<ReadNote>;
            writeNote: (
                ...args: Parameters<WriteNote>
            ) => ReturnType<WriteNote>;
            createNote: (
                ...args: Parameters<CreateNote>
            ) => ReturnType<CreateNote>;
            deleteNote: (
                ...args: Parameters<DeleteNote>
            ) => ReturnType<DeleteNote>;
        };
    }
}
