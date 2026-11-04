import connectDB from "./db";
import { Board, Column } from "./models";

const DEFAULT_COLUMNS = [
    { name: "To Do", tasks: [], order: 0 },
    { name: "In Progress", tasks: [], order: 1 },
    { name: "Done", tasks: [], order: 2 },
    { name: "Backlog", tasks: [], order: 3 },
    { name: "Archived", tasks: [], order: 4 },
    { name: "Ideas", tasks: [], order: 5 },
];

export default async function initUserBoard(userId: string): Promise<void> {
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
                    tasks: column.tasks,
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
