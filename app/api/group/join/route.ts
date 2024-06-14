import prisma from "@/lib/prisma";
import { Oauth } from "@/lib/users/OAuth";
import { getServerSession } from "next-auth";

export async function POST(req:Request) {
    try {
        const session = await getServerSession(Oauth);

        if (!session?.user) {
            return new Response('Unauthorized', { status: 401 })
        }

        const data = await req.json();

        //check if user has an existing member ship
        const membershipExists = await prisma.membership.findFirst({
            where: {
                userId: data.userId,
                groupId: data.groupId,
            }, })

        if (membershipExists) {
            return new Response('You are already a member of this group', { status: 400 })
        }

        //create membership
        const membership = await prisma.membership.create({
            data: {
                userId: data.userId,
                groupId: data.groupId,
            }
        })

        return new Response(data.groupId);

    } catch (e) {

        return new Response('Could not join group', { status: 500 })
    
    
    }

}