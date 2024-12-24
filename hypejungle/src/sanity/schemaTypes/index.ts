import { type SchemaTypeDefinition } from "sanity"
import { author } from "./author"
import { thing } from "./thing"

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [author, thing],
}
