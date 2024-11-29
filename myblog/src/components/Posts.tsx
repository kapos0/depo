import { useState } from "react"
import { blog_data } from "@/assets/assets"
import { categories } from "@/utils/definations"
import Post from "./Post"

export default function Posts() {
    const [menu, setMenu] = useState<string>("All")
    return (
        <>
            <div
                className="flex justify-center gap-6 my-10 overflow-x-auto sm:overflow-x-scroll 
                whitespace-nowrap"
            >
                {categories.map((category, index) => (
                    <button
                        key={index}
                        onClick={() => setMenu(category)}
                        className={`${
                            menu === category
                                ? "bg-black text-white"
                                : "bg-white text-black"
                        } px-4 py-2 font-semibold rounded-lg`}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
                {blog_data
                    .filter((post_item_data) =>
                        menu === "All" ? true : post_item_data.category === menu
                    )
                    .map((post_item_data, index) => (
                        <Post
                            key={index}
                            {...post_item_data}
                        />
                    ))}
            </div>
        </>
    )
}
