import { database } from "@/services/appwrite";

const databaseService = {
    async listDocuments(
        dbId: string,
        collectionId: string,
        queries = [] as string[]
    ) {
        try {
            const response = await database.listDocuments(
                dbId,
                collectionId,
                queries
            );
            return { data: response.documents || [], error: null };
        } catch (error) {
            console.error("Error fetching documents:", (error as any).message);
            return { error: (error as any).message };
        }
    },
};

export default databaseService;
