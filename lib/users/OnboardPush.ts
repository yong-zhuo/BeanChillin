'use server'

import { getServerSession } from "next-auth";
import { prisma } from "../prisma";
import { onboard } from "../schemas/onboardSchema";
import { Oauth } from "./OAuth";

export async function onboardPush(data: any) {
    const { bio, imageUrl, firstName, lastName, imagePublicId, isOnboard } = data
    //get active user email
    const session = await getServerSession(Oauth);
    const email = session?.user ? session.user.email : null;
    //in the event of error
    if (email === null) {
        throw new Error("Email undefined, please refresh the page")
    }

    if (bio !== null && imageUrl !== null && firstName !== null && lastName !== null) {
        await prisma.user.update({
            where: {
                email
            },
            data: {
                bio,
                imageUrl,
                imagePublicId,
                isOnboard,
                name: `${firstName} ${lastName}`,
            }
        })
    }
}