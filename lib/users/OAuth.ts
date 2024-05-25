import GoogleProvider from 'next-auth/providers/google'
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import { userAuthentication } from './LoginUser';
import { prisma } from '../prisma';
import { DefaultArgs } from '@prisma/client/runtime/library';

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
            name: 'Credentials',
            async authorize(credentials, req) {
                const user = await prisma.user.findFirst({
                    where: {
                        email: credentials?.email,
                    },
                    select: {
                        id: true,
                        email: true,
                        password: true,
                    }
                })
                if (user) {
                    return {
                        id: user.id.toString(),
                        email: user.email,
                    };
                } else {
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