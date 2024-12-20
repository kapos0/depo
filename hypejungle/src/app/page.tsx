import SearchForm from "@/components/SearchForm"
import ThingCard from "@/components/ThingCard"

export default async function Home({
    searchParams,
}: {
    searchParams: Promise<{ query: string }>
}) {
    const { query } = await searchParams
    const posts = [
        {
            _createdAt: "Yesterday",
            views: 100,
            author: {
                _id: 1,
                name: "John Doe",
            },
            _id: 1,
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae!",
            image: "https://images.unsplash.com/photo-1719937206098-236a481a2b6d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            category: "Robots",
            title: "Lorem ipsum",
        },
    ]
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
                        posts.map((post) => (
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
