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

        if (feedType === "home") {
            const history = await prisma.user.findUnique({
                where: {
                    email: session?.user?.email!,
                },
            });
            try {
                if ((history?.latestViewedPosts.length ?? 0) > 0) {
                    const reco = await fetch('https://beanchillin-ml.onrender.com/recommend_posts', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            id: history?.latestViewedPosts,
                            offset: parseInt(offset),
                            limit: parseInt(limit),
                        }),
                    });

                    const recoPosts = await reco.json();
                    const posts = await prisma.post.findMany({
                        where: {
                            id: {
                                in: recoPosts,
                            },
                        },
                        include: {
                            votes: true,
                            author: true,
                            comments: true,
                            group: true
                        },
                        take: parseInt(limit),
                    });
                    return new Response(JSON.stringify(posts));
                } else {
                    const posts = await prisma.post.findMany({
                        take: parseInt(limit),
                        skip: parseInt(offset),
                        orderBy: {
                            createdAt: 'desc',
                        },
                        include: {
                            votes: true,
                            author: true,
                            comments: true,
                            group: true
                        }
                    });
                    return new Response(JSON.stringify(posts));
                }
            } catch (error) {
                return new Response('Could not fetch posts', { status: 500 });
            }
        }
        if (feedType === "group") {
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
        } else if (session && feedType === "trend") {
            const trendPosts = await prisma.post.findMany({
                include: {
                    _count: {
                        select: { votes: true },
                    },
                    group: true,
                    votes: true,
                    author: true,
                    comments: true,
                },
                orderBy: {
                    votes: {
                        _count: 'desc',
                    },
                },
                take: parseInt(limit),
                skip: parseInt(offset),
            });
            return new Response(JSON.stringify(trendPosts));
        } else if (session && feedType === "popular") {
            const popularPosts = await prisma.post.findMany({
                include: {
                    _count: {
                        select: { comments: true },
                    },
                    group: true,
                    votes: true,
                    author: true,
                    comments: true,
                },
                orderBy: {
                    comments: {
                        _count: 'desc',
                    },
                },
                take: parseInt(limit),
                skip: parseInt(offset),
            });

            return new Response(JSON.stringify(popularPosts));
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