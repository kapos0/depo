import { homedir } from "os";
import {
    appDirectoryName,
    fileEncoding,
    welcomeNoteFilename,
} from "@/shared/constants";
import {
    ensureDir,
    readdir,
    readFile,
    remove,
    stat,
    writeFile,
} from "fs-extra";
import { isEmpty } from "lodash";
import { NoteInfo } from "@/shared/models";
import welcomeNoteFile from "../../../resources/welcomeNote.md";

export function getRootDir() {
    return `${homedir()}/${appDirectoryName}`;
}

export async function getNoteFromFileName(filename: string): Promise<NoteInfo> {
    const rootDir = getRootDir();
    const fileStats = await stat(`${rootDir}/${filename}`);
    return {
        title: filename.replace(".md", ""),
        content: await readFile(`${rootDir}/${filename}`, {
            encoding: fileEncoding,
        }),
        NoteId: "0",
        lastEditTime: fileStats.mtimeMs,
    };
}

export async function getNotes() {
    const rootDir = getRootDir();
    await ensureDir(rootDir); //Ensures that the directory exists. If the directory structure does not exist, it is created.
    const notesFileNames = await readdir(rootDir, {
        encoding: fileEncoding,
        withFileTypes: false,
    });
    const notes = notesFileNames.filter((filename) => filename.endsWith(".md"));
    if (isEmpty(notes)) {
        console.info("No notes found, creating a welcome note");

        const content = await readFile(welcomeNoteFile, {
            encoding: fileEncoding,
        });

        // create the welcome note
        await writeFile(`${rootDir}/${welcomeNoteFilename}`, content, {
            encoding: fileEncoding,
        });

        notes.push(welcomeNoteFilename);
    }
    return Promise.all(notes.map(getNoteFromFileName));
}

export function writeNote(filename: string, content: string) {
    const rootDir = getRootDir();
    console.info(`Writing note ${filename}`);
    return writeFile(`${rootDir}/${filename}.md`, content, {
        encoding: fileEncoding,
    });
}

export async function deleteNote(filename: string) {
    const rootDir = getRootDir();
    console.info(`Deleting note ${filename}`);
    return remove(`${rootDir}/${filename}.md`);
}
