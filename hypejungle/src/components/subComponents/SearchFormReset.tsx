"use client"

import Link from "next/link"
import { X } from "lucide-react"

export default function SearchFormReset() {
    const reset = () => {
        const form = document.querySelector("#searchEl") as HTMLFormElement

        if (form) form.reset()
    }

    return (
        <button
            type="reset"
            onClick={reset}
        >
            <Link
                href="/"
                className="search-btn text-white"
            >
                <X className="size-5" />
            </Link>
        </button>
    )
}
