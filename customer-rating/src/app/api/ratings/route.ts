import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/db";
import { Rating } from "@/models/rating";
import { Table } from "@/models/table";

type RatingRequest = {
    restaurantId?: string;
    tableId?: string;
    overallRating?: number;
    foodRating?: number;
    staffRating?: number;
    comment?: string;
};

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 10;
const requestCounts = new Map<string, { count: number; resetAt: number }>();

function getClientKey(request: Request): string {
    return (
        request.headers.get("x-real-ip") ??
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
        "unknown"
    );
}

function isRateLimited(key: string): boolean {
    const now = Date.now();
    const current = requestCounts.get(key);

    if (requestCounts.size > 1_000) {
        for (const [storedKey, entry] of requestCounts) {
            if (entry.resetAt <= now) {
                requestCounts.delete(storedKey);
            }
        }
    }

    if (!current || current.resetAt <= now) {
        requestCounts.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
        return false;
    }

    current.count += 1;
    return current.count > RATE_LIMIT_MAX_REQUESTS;
}

export async function POST(request: Request) {
    if (isRateLimited(getClientKey(request))) {
        return NextResponse.json(
            { error: "Çok fazla istek gönderildi. Lütfen biraz sonra tekrar deneyin." },
            { status: 429 },
        );
    }

    let body: RatingRequest;

    try {
        body = (await request.json()) as RatingRequest;
    } catch {
        return NextResponse.json({ error: "Geçersiz istek gövdesi." }, { status: 400 });
    }

    const { restaurantId, tableId, overallRating, foodRating, staffRating, comment } = body;
    const normalizedComment = typeof comment === "string" ? comment.trim() : "";
    const ratings = [overallRating, foodRating, staffRating];

    if (
        typeof restaurantId !== "string" ||
        typeof tableId !== "string" ||
        !mongoose.Types.ObjectId.isValid(restaurantId) ||
        !mongoose.Types.ObjectId.isValid(tableId) ||
        ratings.some((value) => !Number.isInteger(value) || value === undefined || value < 1 || value > 5) ||
        normalizedComment.length > 2_000
    ) {
        return NextResponse.json({ error: "Değerlendirme bilgileri geçersiz." }, { status: 400 });
    }

    try {
        await connectToDatabase();
        const table = await Table.findOne({
            _id: tableId,
            restaurantId,
            isActive: true,
        })
            .select("_id")
            .lean();

        if (!table) {
            return NextResponse.json({ error: "Bu masa bağlantısı artık aktif değil." }, { status: 404 });
        }

        await Rating.create({
            restaurantId,
            tableId,
            overallRating,
            foodRating,
            staffRating,
            comment: normalizedComment || undefined,
            isAnonymous: true,
        });

        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error) {
        console.error("Rating creation failed.", error);
        return NextResponse.json({ error: "Değerlendirme kaydedilemedi." }, { status: 500 });
    }
}
