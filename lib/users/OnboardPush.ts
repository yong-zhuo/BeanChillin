
import { prisma } from "../prisma";
import { onboard } from "../schemas/onboardSchema";

export async function onboardPush(data:onboard, email:string) {
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