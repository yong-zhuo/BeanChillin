import GoogleProvider from 'next-auth/providers/google'
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '../prisma';
import { DefaultArgs } from '@prisma/client/runtime/library';
import bcrypt from 'bcrypt' 

export const Oauth: NextAuthOptions = {
    session: {
        strategy: 'jwt',
        maxAge: 5, //5 seconds. Set to 4 hours on production.
        updateAge: 60 * 60, //1 hour
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
            }
        }),
        CredentialsProvider({
            id: 'credentials',
            name: 'credentials',
            async authorize(credentials, req) {
                try {
                    const user = await prisma.user.findFirst({
                        where: {
                            email: credentials?.email,
                        },
                        select: {
                            id: true,
                            email: true,
                            password: true,
                        }
                    });
                    const isAuth = await bcrypt.compare(credentials?.password as string, user?.password as string);
                    if (isAuth) {
                        return {
                            id: user?.id.toString() as string,
                            email: user?.email,
                        };
                    } else {
                        return null;
                    }
                } catch (e) {
                    return null;
                }
            },
            credentials: {
                email: {},
                password: {}
            },
        })
    ],
    pages: {
        signIn: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ account, profile }) {
            if (account && account.provider === "credentials") {
                return true;
            }

            if (!profile?.email || !account) {
                throw new Error('No profile or account');
            }

            if (account.provider === "google") {
                return profile.email && profile?.email.endsWith("@gmail.com");
            }


            return false;
        },
       
    }
}