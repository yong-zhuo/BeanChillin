'use server'

import prisma from "../prisma";

export async function onboardPush(data: any) {
    const { bio, firstName, lastName, isOnboard, email } = data

    //in the event of error
    if (email === null) {
        throw new Error("Email undefined, please refresh the page")
    }

    if (bio !== null && firstName !== null && lastName !== null) {
        await prisma.user.update({
            where: {
                email
            },
            data: {
                bio,
                isOnboard,
                name: `${firstName} ${lastName}`,
            }
        })
    }
}