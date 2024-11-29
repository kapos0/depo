import { StaticImageData } from "next/image"

export type PostItemType = {
    id: number
    title: string
    description: string
    image: StaticImageData
    date: Date | number
    category: string
    author: string
    author_img: StaticImageData
}

export const categories: string[] = ["All", "Tech", "Business", "Lifestyle"]
