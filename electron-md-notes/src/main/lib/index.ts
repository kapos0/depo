import { homedir } from "os";
import { appDirectoryName, fileEncoding } from "@/shared/constants";
import { ensureDir, readdir, stat } from "fs-extra";
import { NoteInfo } from "@/shared/models";

export function getRootDir() {
    return `${homedir()}/${appDirectoryName}`;
}

export async function getNoteInfoFromFileName(
    filename: string
): Promise<Pick<NoteInfo, "title" | "lastEditTime">> {
    const fileStats = await stat(`${getRootDir()}/${filename}`);
    return {
        title: filename.replace(".md", ""),
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
    return Promise.all(notes.map(getNoteInfoFromFileName));
}
