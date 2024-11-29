import Image from "next/image"
import { assets } from "../assets/assets"
import Link from "next/link"

export default function Header() {
    return (
        <header className="py-5 px-5 md:px-12 lg:px-28">
            <div className="flex justify-between items-center">
                <Link href="/">
                    <Image
                        src={assets.logo}
                        width={180}
                        alt="Logo image"
                        className="w-[130px] sm:w-auto"
                    />
                </Link>
                <button
                    type="button"
                    className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000]"
                >
                    Get Started
                    <Image
                        src={assets.arrow}
                        alt="An arrow image for the get started text just for design purposes"
                    />
                </button>
            </div>
        </header>
    )
}
