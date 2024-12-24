import { defineQuery } from "next-sanity"

export const THINGS_QUERY = defineQuery(`
        *[_type=="thing" && defined(slug.current)] | order(_createdAt desc) {
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
