
import prisma from "@/lib/prisma";
import { Oauth } from "@/lib/users/OAuth";
import { getServerSession } from "next-auth";


export async function GET() {

    try {
        const session = await getServerSession(Oauth);
        if (!session?.user) {
            return new Response("Unauthorized", { status: 401 });
        }
        const res = await prisma.friendship.count({
            where: {
                sender_id: session?.user?.id as string,
                status: 'Friend'
            }
        });
        return Response.json(res);
    } catch (e) {

        return new Response('Could not get total Friend count', { status: 500 })
    }

}