import prisma from "@/lib/prisma";
import { Oauth } from "@/lib/users/OAuth";
import { getServerSession } from "next-auth";

export async function GET() {
    let user = null;
    const session = await getServerSession(Oauth);

    if(session?.user?.email) {
      user = await prisma.user.findUnique({
          where: {
              email: session.user.email
          },
      });
    } else {
        return new Response('User not found', {status: 404})
    }


    const [memberships, createdGroups] = await Promise.all([
      prisma.membership.findMany({
        where: {
          userId: user?.id,
        },
        include: {
          group: true,
        },
      }), prisma.group.findMany({
        where: {
          creatorId: user?.id
        },
      })]);


    const joinedGroups = memberships.map((membership) => membership.group);

    
    return Response.json([joinedGroups, createdGroups]);
  };
