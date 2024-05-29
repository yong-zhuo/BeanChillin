"use server"
import prisma from "../prisma";
import { getServerSession } from "next-auth";
import { Oauth } from "./OAuth";
import { redirect } from "next/navigation";

export default async function IsOnboard() {
    //reroute user to home if session detected
    const ServerSession = await getServerSession(Oauth);
    if (ServerSession === null) {
        redirect('/login');
    }
    const email = ServerSession?.user ? ServerSession.user.email : null;
    //in the event of error
    if (email === null) {
        redirect('/register');
    }
    const res = await prisma.user.findFirst({
        where: {
            email,
        },
        select: {
            isOnboard: true,
        }
    });
    return res === null ? null : res.isOnboard ? redirect('/home') : null;
}
