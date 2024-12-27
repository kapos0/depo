import { type SchemaTypeDefinition } from "sanity"
import { author } from "./author"
import { thing } from "./thing"
import { playlist } from "./playlist"

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [author, thing, playlist],
}
