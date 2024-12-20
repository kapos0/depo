import SearchForm from "@/components/SearchForm"

export default async function Home({
    searchParams,
}: {
    searchParams: Promise<{ query: string }>
}) {
    const { query } = await searchParams
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
        </>
    )
}
