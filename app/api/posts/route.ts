import prisma from "@/lib/prisma";
import { Oauth } from "@/lib/users/OAuth";
import { getServerSession } from "next-auth";
import { z } from "zod";

export async function GET(req: Request) {



    const url = new URL(req.url);

    const session = await getServerSession(Oauth);

    let followedGroupIds: string[] = [];


    try {
        const { limit, offset, groupName, feedType, authorId } = z.object
            ({
                limit: z.string(),
                offset: z.string(),
                groupName: z.string().nullish().optional(),
                feedType: z.string().nullish().optional(),
                authorId: z.string().nullish().optional(),
            }).parse({
                limit: url.searchParams.get("limit"),
                offset: url.searchParams.get("offset"),
                groupName: url.searchParams.get("groupName"),
                feedType: url.searchParams.get("feedType"),
                authorId: url.searchParams.get("authorId"),
            });

        let where = {};

        if (session) {
            const followedGroups = await prisma.membership.findMany({
                where: {
                    user: {
                        email: session?.user?.email,
                    },
                },
                include: {
                    group: true,
                },
            });

            followedGroupIds = followedGroups.map((group) => group.group.id);
        }

        if (groupName) {
            where = {
                group: {
                    name: groupName,
                },
            };
        } else if (session && feedType === "group") {
            where = {
                groupId: {
                    in: followedGroupIds,
                },
            };
        } else if (session && feedType === "user") {
            where = {
                authorId: authorId,
            };
        }
        const posts = await prisma.post.findMany({
            take: parseInt(limit),
            skip: parseInt(offset),
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                group: true,
                votes: true,
                author: true,
                comments: true,
            },
            where: where
        });

        return new Response(JSON.stringify(posts))

    } catch (error) {
        return new Response('Could not fetch posts', { status: 500 })
    }
}