import bcryptjs from 'bcryptjs';
import dbConnect from "@/dbConnect/dbConnect";
import User from "@/modals/User";
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from 'next-auth';
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/lib/MongoDBAdapter';

// mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database>?retryWrites=true&w=majority

export const authOptions: NextAuthOptions = {

    adapter: MongoDBAdapter(clientPromise),
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login'
    },

    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
    },


    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),


        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials, req) {


                const formEmail = credentials?.email as string;
                const plainPassword = credentials?.password as string;
                // connect to the database
                await dbConnect();
                // find the email address
                const isUserExist = await User.findOne({ email: formEmail })

                if (!isUserExist) {
                    return null
                }

                // validate the password
                const isValidPassword = await bcryptjs.compare(plainPassword, isUserExist?.password)
                // console.log("isValidPassword", isValidPassword);
                if (!isValidPassword) {
                    return null
                }

                // return
                return {
                    id: isUserExist?._id,
                    name: isUserExist?.name || "Anonymous",
                    email: isUserExist?.email,
                }
            }
        })
    ],
    debug: process.env.NODE_ENV === 'development',
}


const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

// hello@sandipandas.net
// A@$d34asdf#$