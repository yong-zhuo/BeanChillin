import NextAuth, { getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { NextAuthOptions } from "next-auth";
import { PrismaClient, Prisma } from '@prisma/client';

export const Oauth: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code"
                }
        }})
    ],
    callbacks: {
        async signIn( {account, profile }) {
            const prisma = new PrismaClient();
            if (!profile?.email || !account) {
                throw new Error('No profile or account');
            }

            if (account.provider === "google") {
                return profile.email && profile?.email.endsWith("@gmail.com");
            }

            return false;
        }
    }
}