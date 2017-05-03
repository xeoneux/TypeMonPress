import { Document, Schema } from "mongoose"

import { model } from "mongoose"

export interface IUser extends Document {
    name: string
    email: string
    password: string
    createdAt: Date
    updateAt: Date
    validatePassword(): boolean
}

export const UserSchema = new Schema(
    {
        email: { required: true, type: String, unique: true },
        name: { required: true, type: String },
        password: { required: true, type: String },
    },
    {
        timestamps: true,
    },
)

export const UserModel = model<IUser>("User", UserSchema)
