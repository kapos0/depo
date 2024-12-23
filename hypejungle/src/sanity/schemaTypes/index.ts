import { type SchemaTypeDefinition } from "sanity"
import { author } from "./author"
import { creator } from "./creator"

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [author, creator],
}
