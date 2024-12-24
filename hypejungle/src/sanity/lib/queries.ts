import { defineQuery } from "next-sanity"

export const CREATORS_QUERY = defineQuery(`
        *[_type=="creator" && defined(slug.current)] | order(_createdAt desc) {
        _id,
        title,
        slug,
        _createdAt,
        author->{
        _id, name, slug, image, bio
        },
        views,
        description,
        category,
        image
    }
`)
