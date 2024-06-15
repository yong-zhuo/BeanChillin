"use server"
import prisma from "@/lib/prisma";
import { Oauth } from "@/lib/users/OAuth";
import { getServerSession } from "next-auth";


export default async function GET() {

    const session = await getServerSession(Oauth);

    if (!session?.user) {
        return new Response('Unauthorized', { status: 401 });
    }

    const res = await prisma.friendship.count({
        where: {
            sender_id: session?.user?.email as string,
            status: 'Friend'
        }
    });

    return Response.json(res);
}