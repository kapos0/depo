import { ID } from "react-native-appwrite";
import databaseService from "@/services/databaseService";
import { config } from "@/services/appwrite";

const dbId = config.databaseId;
const collectionId = config.collections.notesCollection;

const notesService = {
    async getNotes() {
        const response = await databaseService.listDocuments(
            dbId,
            collectionId
        );
        if (response.error) return { error: response.error };
        return { data: response.data };
    },
    async addNewNote(content: string) {
        if (!content) return { error: "Content is required" };
        const data = {
            content: content,
            createdAt: new Date().toISOString(),
        };
        const response = await databaseService.createDocument(
            dbId,
            collectionId,
            data,
            ID.unique()
        );
        if (response?.error) return { error: response.error };
        return { data: response };
    },
    async updateNote(noteId: string, content: string) {
        const response = await databaseService.updateDocument(
            dbId,
            collectionId,
            noteId,
            {
                content: content,
            }
        );
        if (response?.error) return { error: response.error };
        return { data: response };
    },
    async deleteNote(noteId: string) {
        if (!noteId) return { error: "Note ID is required" };
        const response = await databaseService.deteleDocument(
            dbId,
            collectionId,
            noteId
        );
        if (response?.error) return { success: false, error: response.error };
        return { success: true };
    },
};

export default notesService;
