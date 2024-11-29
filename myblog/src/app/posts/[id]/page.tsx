"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { PostItemType } from "@/utils/definations"
import { blog_data } from "@/assets/assets"
import { useParams } from "next/navigation"

export default function Page() {
    const { id }: { id: string } = useParams()
    const [data, setData] = useState<PostItemType | undefined>()
    useEffect(() => {
        function fetchData() {
            for (let i = 0; i < blog_data.length; i++) {
                if (Number(id) === blog_data[i].id) {
                    setData(blog_data[i])
                    break
                }
            }
        }
        fetchData()
    }, [id])
    return data ? (
        <>
            <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px28">
                <div className="text-center my-24">
                    <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">
                        {data?.title}
                    </h1>
                    <Image
                        src={data.author_img}
                        alt="Post author image"
                        width={60}
                        height={60}
                        className="mx-auto mt-6 border border-white rounded-full"
                    />
                    <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">
                        {data.author}
                    </p>
                </div>
            </div>
            <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
                <Image
                    src={data.image}
                    alt="Post image"
                    className="border-4 border-white"
                    width={1280}
                    height={720}
                />
                <h1 className="my-8 text-[26px] font-semibold">
                    Introduction:
                </h1>
                <p>{data.description}</p>
                <h3 className="my-5 text-[18px] font-semibold">
                    Step 1: Lorem ipsum dolor sit amet.
                </h3>
                <p className="my-3">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Eum alias pariatur dolor iste eos sunt ducimus adipisci esse
                    eaque ab? Ad sint eligendi quod? Natus, a voluptas! Numquam,
                    rerum est!
                </p>
            </div>
        </>
    ) : (
        <h1 className="text-center my-10">Post Not Found</h1>
    )
}
