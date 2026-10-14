"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { Restaurant } from "@/models/restaurant";
import { Table } from "@/models/table";

export type TableActionState = {
    error?: string;
    success?: boolean;
};

export async function createTable(
    _previousState: TableActionState,
    formData: FormData,
): Promise<TableActionState> {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return { error: "Bu işlemi yapmak için giriş yapmalısınız." };
    }

    const name = String(formData.get("name") ?? "").trim();

    if (name.length < 1 || name.length > 50) {
        return { error: "Masa adı 1 ile 50 karakter arasında olmalı." };
    }

    try {
        await connectToDatabase();
        const restaurant = await Restaurant.findOne({ ownerId: session.user.id }).select("_id").lean();

        if (!restaurant) {
            return { error: "Önce işletmenizi oluşturmalısınız." };
        }

        await Table.create({
            restaurantId: restaurant._id,
            name,
        });

        revalidatePath("/dashboard");
        return { success: true };
    } catch (error) {
        console.error("Table creation failed.", error);
        return { error: "Masa oluşturulurken bir hata oluştu. Lütfen tekrar deneyin." };
    }
}
