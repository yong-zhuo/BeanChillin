"use server"

import { Session, getServerSession } from "next-auth";
import prisma from "../prisma";
import { Oauth } from "../users/OAuth";

export default async function getinfo() {
    const session = await getServerSession(Oauth);
    const email = session?.user ? session.user.email : null;
    const id = await prisma.user.findFirst({
        where: {
            email
        },
        select: {
            id: true
        }
    })

    if (id === null || email === null || email === undefined) {
        throw new Error("Unable to find user");
    }

    return { email: email, public_id: id.id }
}