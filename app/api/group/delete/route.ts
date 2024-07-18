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

        //check if group exists
        const groupExists = await prisma.group.findFirst({
            where: {
                id: data.groupId,

            },
        });

        const groupQuery = `https://beanchillin-ml.onrender.com/delete_group`;
        const groupRes = await fetch(groupQuery, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                group: data.groupId,
            }),
        });

        if (!groupExists) {
            return new Response("Group does not exists", { status: 409 });
        }

        //delete all memberships and posts of group
        await Promise.all([
            prisma.membership.deleteMany({
                where: {
                    groupId: data.groupId,
                },
            }),
            prisma.post.deleteMany({
                where: {
                    groupId: data.groupId,
                },
            })

        ])


        //then delete group
        await prisma.group.delete({
            where: {
                id: data.groupId,
            },
        });

        return new Response("Group deleted successfully", { status: 200 });

    } catch (e) {
        return new Response("Could not delete group", { status: 500 });
    }
}