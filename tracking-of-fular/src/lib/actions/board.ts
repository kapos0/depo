"use server";

import connectDB from "@/lib/db";
import { getSession } from "@/lib/auth/auth";
import { Board, Column, Fular } from "@/lib/models";
import initUserBoard from "@/lib/init-user-board";
import { revalidatePath } from "next/cache";

type ActionResult = { error?: string; success?: boolean };

async function getUserId() {
    const session = await getSession();
    return session?.user?.id ?? null;
}

function clean(value: FormDataEntryValue | null) {
    return typeof value === "string" ? value.trim() : "";
}

export async function getDashboardData() {
    const userId = await getUserId();
    if (!userId) return null;

    await initUserBoard(userId);
    await connectDB();
    const boards = await Board.find({ userId }).sort({ createdAt: 1 }).lean();
    const boardIds = boards.map((board) => board._id);
    const [columns, fulars] = await Promise.all([
        Column.find({ boardId: { $in: boardIds } }).sort({ order: 1 }).lean(),
        Fular.find({ userId }).sort({ order: 1, createdAt: -1 }).lean(),
    ]);

    return {
        boards: boards.map((board) => ({ id: board._id.toString(), name: board.name })),
        columns: columns.map((column) => ({
            id: column._id.toString(),
            boardId: column.boardId.toString(),
            name: column.name,
            order: column.order,
        })),
        fulars: fulars.map((fular) => ({
            id: fular._id.toString(),
            boardId: fular.boardId.toString(),
            columnId: fular.columnId.toString(),
            title: fular.title,
            creator: fular.creator,
            mediaType: fular.mediaType ?? "Diğer",
            category: fular.category ?? "",
            description: fular.description ?? "",
            rating: fular.rating ?? "",
            mediaUrl: fular.mediaUrl ?? "",
            actionDate: fular.actionDate?.toISOString() ?? "",
            tags: fular.tags ?? [],
            order: fular.order,
        })),
    };
}

export async function createBoard(formData: FormData): Promise<ActionResult> {
    const userId = await getUserId();
    const name = clean(formData.get("name"));
    if (!userId) return { error: "Oturumunuzun süresi dolmuş." };
    if (!name) return { error: "Board adı gerekli." };

    await connectDB();
    const board = await Board.create({ name, userId, columns: [] });
    const column = await Column.create({ name: "Planlandı", boardId: board._id, order: 0 });
    board.columns = [column._id];
    await board.save();
    revalidatePath("/dashboard");
    return { success: true };
}

export async function createColumn(formData: FormData): Promise<ActionResult> {
    const userId = await getUserId();
    const boardId = clean(formData.get("boardId"));
    const name = clean(formData.get("name"));
    if (!userId || !boardId || !name) return { error: "Kolon adı gerekli." };

    await connectDB();
    const board = await Board.findOne({ _id: boardId, userId });
    if (!board) return { error: "Board bulunamadı." };
    const order = await Column.countDocuments({ boardId });
    const column = await Column.create({ name, boardId, order, fulars: [] });
    board.columns.push(column._id);
    await board.save();
    revalidatePath("/dashboard");
    return { success: true };
}

export async function createFular(formData: FormData): Promise<ActionResult> {
    const userId = await getUserId();
    const boardId = clean(formData.get("boardId"));
    const columnId = clean(formData.get("columnId"));
    const title = clean(formData.get("title"));
    const creator = clean(formData.get("creator"));
    if (!userId || !boardId || !columnId || !title || !creator) {
        return { error: "Başlık ve üretici bilgisi gerekli." };
    }

    await connectDB();
    const column = await Column.findOne({ _id: columnId, boardId });
    if (!column || !(await Board.exists({ _id: boardId, userId }))) {
        return { error: "Geçersiz board veya kolon." };
    }
    const order = await Fular.countDocuments({ columnId });
    await Fular.create({
        title,
        creator,
        mediaType: clean(formData.get("mediaType")) || "Diğer",
        boardId,
        columnId,
        userId,
        order,
        category: clean(formData.get("category")),
        description: clean(formData.get("description")),
        rating: clean(formData.get("rating")),
        mediaUrl: clean(formData.get("mediaUrl")),
        tags: clean(formData.get("tags")).split(",").map((tag) => tag.trim()).filter(Boolean),
        actionDate: clean(formData.get("actionDate")) || undefined,
    });
    revalidatePath("/dashboard");
    return { success: true };
}

export async function moveFular(
    fularId: string,
    columnId: string,
): Promise<ActionResult> {
    const userId = await getUserId();
    if (!userId) return { error: "Oturumunuzun süresi dolmuş." };
    await connectDB();
    const fular = await Fular.findOne({ _id: fularId, userId });
    const column = fular && await Column.findOne({ _id: columnId, boardId: fular.boardId });
    if (!fular || !column) return { error: "Fular veya kolon bulunamadı." };
    fular.columnId = column._id;
    fular.order = await Fular.countDocuments({ columnId });
    await fular.save();
    revalidatePath("/dashboard");
    return { success: true };
}

export async function deleteFular(fularId: string): Promise<ActionResult> {
    const userId = await getUserId();
    if (!userId) return { error: "Oturumunuzun süresi dolmuş." };
    await connectDB();
    const result = await Fular.deleteOne({ _id: fularId, userId });
    if (!result.deletedCount) return { error: "Fular bulunamadı." };
    revalidatePath("/dashboard");
    return { success: true };
}
