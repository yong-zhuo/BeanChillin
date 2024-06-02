"use server"
import prisma from "../prisma";
import { getServerSession } from "next-auth";
import { Oauth } from "./OAuth";

export default async function IsOnboard() {
    //reroute user to home if session detected
    const ServerSession = await getServerSession(Oauth);
    if (ServerSession === null) {
        return 'login';
    }
    const email = ServerSession?.user ? ServerSession.user.email : null;
    //in the event of error
    if (email === null) {
        return 'register';

    }
    const res = await prisma.user.findFirst({
        where: {
            email,
        },
        select: {
            isOnboard: true,
        }
    });
    return res === null ? 'ok' : res.isOnboard ? 'home' : 'ok';
}
