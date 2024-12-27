import { formatDate } from "@/lib/utils"
import { EyeIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { Author, Thing } from "@/sanity/types"

export type ThingTypeCard = Omit<Thing, "author"> & { author?: Author }

export default function ThingCard({ post }: { post: any }) {
    const {
        _createdAt,
        views,
        author,
        title,
        description,
        category,
        _id,
        image,
    } = post
    return (
        <li className="startup-card group">
            <div className="flex-between">
                <p className="startup_card_date">{formatDate(_createdAt)}</p>
                <div className="flex gap-1.5">
                    <EyeIcon className="size-6 text-primary" />
                    <span className="text-16-medium">{views}</span>
                </div>
            </div>
            <div className="flex-between mt-5 gap-5">
                <div className="flex-1">
                    <Link href={`/user/${author?._id}`}>
                        <p className="text-16-medium line-clamp-1">
                            {author?.name}
                        </p>
                    </Link>
                    <Link href={`/thing/${_id}`}>
                        <h3 className="text-26-semibold line-clamp-1">
                            {title}
                        </h3>
                    </Link>
                </div>
                <Link href={`/user/${author?._id}`}>
                    <Image
                        src={author?.image}
                        alt="user profile"
                        width={48}
                        height={48}
                        className="rounded-full"
                    />
                </Link>
            </div>
            <Link href={`/thing/${_id}`}>
                <p className="startup-card_desc">{description}</p>
                <Image
                    src={image}
                    alt="thing image"
                    width={800}
                    height={400}
                    className="startup-card_img"
                />
            </Link>
            <div className="flex-between gap-3 mt-5">
                <Link href={`/?query=${category.toLowerCase()}`}>
                    <p className="text-16-medium">{category}</p>
                </Link>
                <Button
                    asChild
                    className="startup_card_btn"
                >
                    <Link href={`/thing/${_id}`}>Details</Link>
                </Button>
            </div>
        </li>
    )
}
