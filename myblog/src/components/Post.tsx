import Image from "next/image"
import { PostItemType } from "@/utils/definations"
import { assets } from "../assets/assets"
import Link from "next/link"

export default function Post({
    id,
    title,
    description,
    image,
    category,
}: PostItemType) {
    return (
        <div className="max-w-[330px] sm:max-w-[300px] bg-white border border-black hover:shadow-[-7px_7px_0px_#000000]">
            <Image
                src={image}
                className="border-b border-black"
                alt="Blog image"
                width={400}
                height={400}
            />
            <h4 className="ml-5 mt-5 px-1 inline-block bg-black text-white text-sm ">
                {category}
            </h4>
            <div className="p-5">
                <h5 className="mb-2 text-lg font-medium tracking-tight text-gray-900">
                    {title}
                </h5>
                <p className="mb-3 text-sm tracking-tight text-gray-700">
                    {description}
                </p>
                <Link
                    href={`/posts/${id}`}
                    type="button"
                    className="inline-flex items-center py-2 font-semibold text-center"
                >
                    Read More
                    <Image
                        src={assets.arrow}
                        alt="Read More arrow image"
                        width={12}
                        className="ml-2"
                    />
                </Link>
            </div>
        </div>
    )
}
