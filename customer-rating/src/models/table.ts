import { randomUUID } from "node:crypto";
import { Schema, model, models } from "mongoose";

const tableSchema = new Schema(
    {
        restaurantId: {
            type: Schema.Types.ObjectId,
            ref: "Restaurant",
            required: true,
            index: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 50,
        },
        publicSlug: {
            type: String,
            required: true,
            unique: true,
            default: () => randomUUID(),
            index: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true },
);

export const Table = models.Table || model("Table", tableSchema);
