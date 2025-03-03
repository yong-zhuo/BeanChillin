import prisma from "@/lib/prisma";
import { Oauth } from "@/lib/users/OAuth";
import { getServerSession } from "next-auth";



export async function POST(req:Request) {
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
                type: data.type,
                creatorId: data.creatorId,
            }
        })

        if (typeof group.creatorId === 'undefined') {
            return new Response('Creator ID is undefined', { status: 400 });
        }

        await prisma.membership.create({
            data: {
                userId: group.creatorId as string,
                groupId: group.id,
            },})

        return new Response(JSON.stringify(group.name));
    
    } catch (e) {
        console.log(e)
        return new Response('Could not create group', {status: 500})
    }
}