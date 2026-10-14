"use client";

import { QRCodeSVG } from "qrcode.react";
import { toggleTableStatus } from "@/app/dashboard/table-actions";

type TableQrProps = {
    name: string;
    url: string;
    tableId: string;
    isActive: boolean;
};

export function TableQr({ name, url, tableId, isActive }: TableQrProps) {
    async function copyUrl() {
        await navigator.clipboard.writeText(url);
    }

    return (
        <article className={`flex flex-col gap-5 rounded-3xl p-6 shadow-sm sm:flex-row sm:items-center ${isActive ? "bg-white" : "bg-black/[0.03] opacity-75"}`}>
            {isActive && (
                <div className="rounded-2xl bg-white p-3 ring-1 ring-black/5">
                    <QRCodeSVG value={url} size={128} bgColor="#ffffff" fgColor="#161616" level="M" />
                </div>
            )}
            <div className="min-w-0">
                <p className={`text-sm font-semibold uppercase tracking-[0.15em] ${isActive ? "text-[#33774b]" : "text-black/40"}`}>
                    {isActive ? "Aktif masa" : "Pasif masa"}
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight">{name}</h3>
                {isActive && <p className="mt-2 truncate text-sm text-black/45">{url}</p>}
                <div className="mt-4 flex flex-wrap gap-2">
                    {isActive && (
                        <button
                            type="button"
                            onClick={copyUrl}
                            className="rounded-full border border-black/10 px-4 py-2 text-sm font-medium transition hover:border-black/30"
                        >
                            Bağlantıyı kopyala
                        </button>
                    )}
                    <form action={toggleTableStatus}>
                        <input type="hidden" name="tableId" value={tableId} />
                        <button
                            type="submit"
                            className={`rounded-full px-4 py-2 text-sm font-medium transition ${isActive ? "border border-red-200 text-red-700 hover:bg-red-50" : "bg-[#161616] text-white hover:bg-[#333]"}`}
                        >
                            {isActive ? "Pasifleştir" : "Aktifleştir"}
                        </button>
                    </form>
                </div>
            </div>
        </article>
    );
}
