import prisma from "@/lib/prisma";
import { MembershipValidator, createGroupSchema } from "@/lib/schemas/createGroupSchema";
import { Oauth } from "@/lib/users/OAuth";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";


export async function POST(req:Request, user: User) {
    try {
        const session = await getServerSession(Oauth);
        

        if (!session?.user) {
            return new Response("Unauthorized", { status: 401 });
        }

        const data = await req.json();
        

        //check if group exists
        const groupExists = await prisma.group.findFirst({
            where: {
                name: data.name,
            },
        })

        if (groupExists){
            return new Response("Group already exists", { status: 409});
        }

        //create group
        const group = await prisma.group.create({
            data: {
                name: data.name,
                description: data.description,
                picture: data.picture,
                banner: data.banner,
                type: data.type,
                creatorId: user.id,
            }
        })

        await prisma.membership.create({
            data: {
                userId: user.id,
                groupId: group.id,
            },})

            return new Response(group.name);
    
    } catch (e) {
        return new Response('Could not create group', {status: 500})
    }
}