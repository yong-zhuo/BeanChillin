import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../prisma';
import bcrypt from 'bcrypt'

export interface CustomSessionUser {
    id?: string; // Add other properties as needed
    name?: string;
    email?: string;
    imageUrl?: string; // Add the 'imageUrl' property
}

export interface CustomToken {
    id?: string;
    picture?: string;
}

export const Oauth: NextAuthOptions = {
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60, //5 seconds. Set to 4 hours on production.
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
    callbacks: {
        async signIn({ account, profile }) {
            if (account && account.provider === "credentials") {
                return true;
            }

            if (!profile?.email || !account) {
                throw new Error('No profile or account');
            }

            if (account.provider === "google") {
                if (!profile.email || !profile.email.endsWith("@gmail.com")) {
                    return false;
                }
                try {
                    //if user is in database, can send user to login page
                    const res = await prisma.user.findFirst({
                        where: { email: profile.email }
                    })
                    if (res !== null) {
                        return true;
                    }
                    const generator = require('generate-password');
                    const password = generator.generate({
                        length: 32,
                        numbers: true,
                        symbol: true
                    });
                    const googleProfile = profile as GoogleProfile;
                    //If user is not in database, need to create info first
                    const isCreate = await prisma.user.create({
                        data: {
                            name: profile?.name,
                            email: profile.email,
                            password: await bcrypt.hash(password, 4),
                            imageUrl: googleProfile?.picture,
                            bio: "Hello!",
                            signinType: false,
                            isOnboard: false
                        },
                    });
                    return true;
                } catch (e) {
                    throw new Error();
                }
            }
            return false;
        },
        jwt: async ({ token, user }) => {
            const user_id = (await prisma.user.findFirst({
                where: {
                    email: user?.email
                },
                select: {
                    id: true,
                    imageUrl: true,
                }
            }));
            if (user_id) {
                token.id = user_id.id;
                token.picture = user_id.imageUrl;
            }
            return token;
        },
        session: async ({ session, token }) => {
            if (token && session.user) {
                session.user.id = token.id;
                session.user.image = token.picture;
            }
            return session;
        }
    }
}