import { Schema, model, models } from "mongoose"

const UserSchema = new Schema(
    {
        name: {
            type: String,
            unique: [true, "Name already exits!"],
            required: [true, "Name is required!"],
        },
        email: {
            type: String,
            required: [true, "Email is required!"],
            unique: [true, "Email already exits!"],
        },
        password: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
)
const User = models.User || model("User", UserSchema)
export default User
