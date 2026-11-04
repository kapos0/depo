import connectDB from "./db";
import { Board, Column } from "./models";

const DEFAULT_COLUMNS = [
    { name: "Planlandı", order: 0 },
    { name: "Devam ediyor", order: 1 },
    { name: "Tamamlandı", order: 2 },
    { name: "Arşiv", order: 3 },
];

export default async function initUserBoard(userId: string) {
    try {
        await connectDB();
        const existingBoard = await Board.findOne({ userId, name: "Fular" });
        if (existingBoard) return existingBoard;

        const board = await Board.create({
            userId,
            name: "Fular",
            columns: [],
        });
        const columns = await Promise.all(
            DEFAULT_COLUMNS.map(async (column) => {
                const newColumn = await Column.create({
                    name: column.name,
                    order: column.order,
                    boardId: board._id,
                });
                return newColumn;
            }),
        );
        board.columns = columns.map((column) => column._id);
        await board.save();
        return board;
    } catch (error) {
        console.error("Error initializing user board:", error);
        throw error;
    }
}
