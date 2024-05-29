import { prisma } from "@/lib/prisma";
import { Oauth } from "@/lib/users/OAuth";
import { getServerSession } from "next-auth";

export async function GET() {
    const session = await getServerSession(Oauth);
    if(session?.user?.email) {
        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email
            },
        });
        return Response.json(user);
    } else {
        return new Response('User not found', {status: 404})
    }
}