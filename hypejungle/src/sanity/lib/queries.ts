import { defineQuery } from "next-sanity"

export const THINGS_QUERY = defineQuery(`
    *[_type == "thing" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search] | order(_createdAt desc) {
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

export const THING_BY_ID_QUERY = defineQuery(`
    *[_type == "thing" && _id == $id][0]{
        _id, 
        title, 
        slug,
        _createdAt,
        author -> {
            _id, name, username, image, bio
        }, 
        views,
        description,
        category,
        image,
        pitch,
    }
`)

export const PLAYLIST_BY_SLUG_QUERY = defineQuery(`
    *[_type == "playlist" && slug.current == $slug][0]{
        _id,
        title,
        slug,
        select[]->{
            _id,
            _createdAt,
            title,
            slug,
            author->{
                _id,
                name,
                slug,
                image,
                bio
            },
        views,
        description,
        category,
        image,
        pitch
        }
    }
`)

export const THING_VIEWS_QUERY = defineQuery(`
    *[_type == "thing" && _id == $id][0]{
        _id, views
    }
`)
