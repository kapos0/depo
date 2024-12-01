import mongoose from "mongoose"

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        author_img: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        category: {
            type: String,
        },
    },
    { timestamps: true }
)

export const PostModel =
    mongoose.models.Post || mongoose.model("Post", PostSchema)
