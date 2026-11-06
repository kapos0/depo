"use client";

import { FormEvent, useState } from "react";
import { authClient } from "@/lib/auth/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfileForm({ name, email }: { name: string; email: string }) {
    const [form, setForm] = useState({ name, email });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isPending, setIsPending] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setMessage("");
        setError("");
        setIsPending(true);

        const nameResult = await authClient.updateUser({ name: form.name.trim() });
        if (nameResult.error) {
            setError(nameResult.error.message ?? "Hesap bilgileri güncellenemedi.");
            setIsPending(false);
            return;
        }

        if (form.email.trim().toLowerCase() !== email.toLowerCase()) {
            const emailResult = await authClient.changeEmail({
                newEmail: form.email.trim(),
                callbackURL: "/profile",
            });
            if (emailResult.error) {
                setError(emailResult.error.message ?? "E-posta adresi güncellenemedi.");
                setIsPending(false);
                return;
            }
            setMessage("Değişiklikler kaydedildi. Yeni e-posta adresini doğrulaman gerekebilir.");
        } else {
            setMessage("Değişiklikler kaydedildi.");
        }
        setIsPending(false);
    }

    return <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
            <Label htmlFor="profile-name">Ad soyad</Label>
            <Input id="profile-name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
        </div>
        <div className="space-y-1.5">
            <Label htmlFor="profile-email">E-posta</Label>
            <Input id="profile-email" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
        </div>
        {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
        {message && <p role="status" className="text-sm text-green-600">{message}</p>}
        <div className="flex justify-end">
            <Button type="submit" disabled={isPending}>{isPending ? "Kaydediliyor..." : "Kaydet"}</Button>
        </div>
    </form>;
}
