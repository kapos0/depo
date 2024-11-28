import Image from "next/image"
import { assets } from "@/assets/assets"

export default function Footer() {
    return (
        <footer className="flex justify-around flex-col gap-2 sm:gap-0 sm:flex-row bg-black py-5 items-center">
            <Image
                src={assets.logo_light}
                alt="footer logo image"
                width={120}
            />
            <p className="text-sm text-white">Mehmet Enes Turhan 2024</p>
            <div className="flex">
                <Image
                    src={assets.facebook_icon}
                    alt="Facebook icon"
                    width={40}
                />
                <Image
                    src={assets.twitter_icon}
                    alt="Twitter icon"
                    width={40}
                />
                <Image
                    src={assets.googleplus_icon}
                    alt="Google Plus icon"
                    width={40}
                />
            </div>
        </footer>
    )
}
