import SearchForm from "@/components/SearchForm"
import ThingCard, { ThingTypeCard } from "@/components/ThingCard"
import { client } from "@/sanity/lib/client"
import { THINGS_QUERY } from "@/sanity/lib/queries"

export default async function Home({
    searchParams,
}: {
    searchParams: Promise<{ query: string }>
}) {
    const { query } = await searchParams
    //const posts: ThingTypeCard[] = await client.fetch(THINGS_QUERY)
    const posts = await client.fetch(THINGS_QUERY)
    console.log(posts)
    return (
        <>
            <section className="pink_container">
                <h1 className="heading">
                    Lorem ipsum dolor sit amet. <br /> Lorem, ipsum dolor.
                </h1>
                <p className="sub-heading !max-w-3xl">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Beatae!
                </p>
                <SearchForm query={query} />
            </section>
            <section className="section_container">
                <p className="text-30-semibold">
                    {query ? `Search results for ${query}` : "All Things"}
                </p>
                <ul className="mt-7 card_grid">
                    {posts?.length > 0 ? (
                        posts.map((post: any) => (
                            <ThingCard
                                key={post._id}
                                post={post}
                            />
                        ))
                    ) : (
                        <p className="no-results">No things found</p>
                    )}
                </ul>
            </section>
        </>
    )
}
