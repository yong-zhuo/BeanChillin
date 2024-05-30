"use server"
import prisma from "../prisma"

interface Data {
    email: string,
    imageUrl: string,
    imagePublicId: string
}

export default async function postimage(data: Data) {
    if (data.imageUrl !== null && data.imagePublicId !== null && data.email !== null) {
        await prisma.user.update({
            where: {
                email: data.email
            },
            data: {
                imageUrl: data.imageUrl,
                imagePublicId: data.imagePublicId
            }
        })
    }
}