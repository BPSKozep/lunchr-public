import mongoose, { model, Schema } from "mongoose";
import type { Model } from "mongoose";

export interface IUser {
    _id: string;
    name: string;
    email: string;
}

const UserSchema = new Schema<IUser>({
    _id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        index: { unique: true },
    },
});

const User: Model<IUser> =
    mongoose.models.User || model<IUser>("User", UserSchema);

export default User;
