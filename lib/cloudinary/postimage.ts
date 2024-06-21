"use server"
import prisma from "../prisma"

interface Data {
    email?: string,
    imageUrl: string,
    imagePublicId?: string
    groupName?: string
}

type uploadType = 'groupPicture' | 'banner' | 'userImage'

export default async function postimage(data: Data, uploadType: uploadType) {
    if (data.groupName !== null && data.imageUrl !== null && uploadType === 'groupPicture') {
        await prisma.group.update({
            where: {
                name: data.groupName
            },
            data: {
                picture: data.imageUrl,
                
            }
        })
    }

    if (data.groupName !== null && data.imageUrl !== null && uploadType === 'banner') {
        await prisma.group.update({
            where: {
                name: data.groupName
            },
            data: {
                banner: data.imageUrl,
                
            }
        })
    }


    if (data.imageUrl !== null && data.imagePublicId !== null && data.email !== null && uploadType === 'userImage') {
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