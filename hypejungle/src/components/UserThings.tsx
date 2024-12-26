import { client } from "@/sanity/lib/client"
import { THING_BY_AUTHOR_QUERY } from "@/sanity/lib/queries"
import ThingCard, { ThingTypeCard } from "./ThingCard"

export default async function UserThings({ id }: { id: string }) {
    const things = await client.fetch(THING_BY_AUTHOR_QUERY, { id })

    return (
        <>
            {things.length > 0 ? (
                things.map((startup: ThingTypeCard) => (
                    <ThingCard
                        key={startup._id}
                        post={startup}
                    />
                ))
            ) : (
                <p className="no-result">No posts yet</p>
            )}
        </>
    )
}
