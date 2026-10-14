"use client";

import { QRCodeSVG } from "qrcode.react";

type TableQrProps = {
    name: string;
    url: string;
};

export function TableQr({ name, url }: TableQrProps) {
    async function copyUrl() {
        await navigator.clipboard.writeText(url);
    }

    return (
        <article className="flex flex-col gap-5 rounded-3xl bg-white p-6 shadow-sm sm:flex-row sm:items-center">
            <div className="rounded-2xl bg-white p-3 ring-1 ring-black/5">
                <QRCodeSVG value={url} size={128} bgColor="#ffffff" fgColor="#161616" level="M" />
            </div>
            <div className="min-w-0">
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#33774b]">Aktif masa</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight">{name}</h3>
                <p className="mt-2 truncate text-sm text-black/45">{url}</p>
                <button
                    type="button"
                    onClick={copyUrl}
                    className="mt-4 rounded-full border border-black/10 px-4 py-2 text-sm font-medium transition hover:border-black/30"
                >
                    Bağlantıyı kopyala
                </button>
            </div>
        </article>
    );
}
