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
};

export default notesService;
