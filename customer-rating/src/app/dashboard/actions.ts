"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { Restaurant } from "@/models/restaurant";

export type RestaurantActionState = {
    error?: string;
    success?: boolean;
};

function createSlug(value: string): string {
    return value
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 70);
}

export async function createRestaurant(
    _previousState: RestaurantActionState,
    formData: FormData,
): Promise<RestaurantActionState> {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return { error: "Bu işlemi yapmak için giriş yapmalısınız." };
    }

    const name = String(formData.get("name") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();

    if (name.length < 2 || name.length > 120) {
        return { error: "İşletme adı 2 ile 120 karakter arasında olmalı." };
    }

    if (description.length > 500) {
        return { error: "Açıklama 500 karakterden uzun olamaz." };
    }

    const baseSlug = createSlug(name);

    if (!baseSlug) {
        return { error: "İşletme adı geçerli bir URL oluşturamıyor." };
    }

    try {
        await connectToDatabase();

        const existing = await Restaurant.findOne({ slug: baseSlug }).select("_id").lean();
        const slug = existing ? `${baseSlug}-${Date.now().toString(36)}` : baseSlug;

        await Restaurant.create({
            ownerId: session.user.id,
            name,
            slug,
            description: description || undefined,
        });

        return { success: true };
    } catch (error) {
        console.error("Restaurant creation failed.", error);
        return { error: "İşletme oluşturulurken bir hata oluştu. Lütfen tekrar deneyin." };
    }
}
