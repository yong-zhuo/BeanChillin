import { FormData } from "@/types/formData";
import { prisma } from "../prisma";

export async function onboardAuth(data:FormData, email:string) {
    const {bio, image, firstName, lastName} = data

    if (bio !== null && image !== null && firstName !== null && lastName !== null ) {
        await prisma.user.update({
            where: {
                email
            }, 
            data: {
                bio,
                image,
                name: `${firstName} ${lastName}`,
            }
        })
    }
}