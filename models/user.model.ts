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

export const UserSchema = new Schema({
    email: { required: true, type: Schema.Types.String, unique: true },
    name: { required: true, type: Schema.Types.String },
    password: { required: true, type: Schema.Types.String },
}, { timestamps: true })

export const userModel = model<IUser>("User", UserSchema)
