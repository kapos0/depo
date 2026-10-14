import Link from "next/link";
import { Suspense } from "react";
import { RatingForm } from "@/components/rating-form";
import { connectToDatabase } from "@/lib/db";
import { Table } from "@/models/table";
import { Restaurant } from "@/models/restaurant";
import { notFound } from "next/navigation";

type RatingPageProps = {
    params: Promise<{ slug: string }>;
};

async function RatingPageContent({ params }: RatingPageProps) {
    const { slug } = await params;
    await connectToDatabase();
    const table = await Table.findOne({ publicSlug: slug, isActive: true }).lean();

    if (!table) {
        notFound();
    }

    const restaurant = await Restaurant.findById(table.restaurantId).select("name description").lean();

    if (!restaurant) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-[#f7f7f4] px-5 py-6 text-[#161616] sm:px-8 sm:py-10">
            <div className="mx-auto max-w-xl">
                <header className="mb-7 flex items-center justify-between px-1">
                    <Link href="/" className="flex items-center gap-2 text-base font-semibold tracking-tight">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#161616] text-sm text-white">m</span>
                        MasaPuan
                    </Link>
                    <span className="text-xs text-black/35">{table.name}</span>
                </header>
                <RatingForm restaurantName={restaurant.name} tableName={table.name} tableId={String(table._id)} restaurantId={String(restaurant._id)} />
                <p className="mt-6 text-center text-xs text-black/35">Bu sayfa işletmenin QR kodu ile açıldı.</p>
            </div>
        </main>
    );
}

export default function RatingPage({ params }: RatingPageProps) {
    return (
        <Suspense fallback={<main className="min-h-screen bg-[#f7f7f4]" />}>
            <RatingPageContent params={params} />
        </Suspense>
    );
}
