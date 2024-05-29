"use server"

import { getServerSession } from "next-auth";
import { Oauth } from "../users/OAuth";
import prisma from "../prisma";

export default async function getid() {
    const session = await getServerSession(Oauth);
    const email = session?.user ? session.user.email : null;
    const res = await prisma.user.findFirst({
        where: {
            email
        },
        select: {
            id: true
        }
    })

    return res?.id;
}