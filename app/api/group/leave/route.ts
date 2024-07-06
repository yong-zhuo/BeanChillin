import prisma from "@/lib/prisma";
import { Oauth } from "@/lib/users/OAuth";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {

    try {
        const session = await getServerSession(Oauth);
        
        if (!session?.user) {
            return new Response("Unauthorized", { status: 401 });
        }

        const data = await req.json();

        //check if membership exists
        const [membershipExists, moderatorExists] = await Promise.all([prisma.membership.findFirst({
            where: {
                userId: data.userId,
                groupId: data.groupId,
            },
        }), prisma.moderator.findFirst({
            where: {
                userId: data.userId,
                groupId: data.groupId,
            },})]);

        if (!membershipExists) {
            return new Response("You are not a member of this group", { status: 400 });
        }

        if(moderatorExists){
            await prisma.moderator.delete({
                where: {
                    groupId_userId: {
                        userId: data.userId,
                        groupId: data.groupId,
                    },
                },
            });
        }
        //delete membership
        await prisma.membership.delete({
            where: {
                userId_groupId: {
                    userId: data.userId,
                    groupId: data.groupId,
                },
            },
        });

        return new Response("Left group", { status: 200 });

    } catch (e) {
        return new Response("Could not leave group", { status: 500 });
    }

}