import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: "Anonymous",
            min: 2,
            max: 100,
            // required: [true, "Name must be provided"],
        },
        email: {
            type: String,
            // required: true,
            match: /.+\@.+\..+/,
            unique: true,
            min: 2,
            max: 100,
        },
        password: {
            type: String,
            min: 5,
            // required: [true, "Password must be provided"],
        },
        uid: {
            type: String,
            // unique: true,
        },
        roles: {
            type: [Number],
            default: [2001],
        },
        is_admin: {
            type: Boolean,
            default: false,
        },
        active: {
            type: Boolean,
            default: true,
        },
        softDelete: {
            type: Boolean,
            default: false,
        },
        lastLoginAt: {
            type: String,
            default: Date.now(),
        },
        refreshToken: {
            type: String,
            default: null,
        },
        sAccessToken: {
            type: String,
            default: null,
        },
        issuedAt: {
            type: Number,
            default: 101010,
        },
        occupation: String,
        deletedAt: String,
        provider: String,
        image: String,
        bio: String,
        lastLoginIp: String,
        city: String,
        state: String,
        country: String,

        phoneNumber: String,

        forgotPasswordToken: String,
        forgotPasswordTokenExpiry: Date,
        verifyToken: String,
        verifyTokenExpiry: Date,
    },
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);
// const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
