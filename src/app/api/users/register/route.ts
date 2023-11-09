import dbConnect from "@/dbConnect/dbConnect";
import User from "@/modals/User";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(req: NextRequest) {

    try {

        await dbConnect();
        const reqBody = await req.json();
        const { name, email, password } = reqBody;

        if (!name || !email || !password) {
            return NextResponse.json({ error: "Missing Fields" }, { status: 400 });
        }

        const isUserExist = await User.findOne({ email });
        if (isUserExist) {
            return NextResponse.json({ error: "User already exist" }, { status: 400 });
        }

        // generate salt
        const salt = await bcryptjs.genSalt(10)
        // hashed the password
        const hashedPassword = await bcryptjs.hash(password, salt)
        // save user to database
        const savedUser = await new User({ name, email, password: hashedPassword }).save();

        // return user

        // console.log("reqBody", savedUser);
        return NextResponse.json({ message: "User created successfully", success: true })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}