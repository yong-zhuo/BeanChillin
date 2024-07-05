import prisma from "@/lib/prisma";
import { Oauth } from "@/lib/users/OAuth";
import { getServerSession } from "next-auth";
import { z } from "zod";

export async function GET(req: Request) {

    const url = new URL(req.url);

    const session = await getServerSession(Oauth);

    const user = await prisma.user.findUnique({
        where: {
            email: session?.user.email as string,
        },
    });

    try {
        const {limit, offset, filter} = z.object({
            limit: z.string(),
            offset: z.string(),
            filter: z.string().nullish().optional(),
        }).parse({
            limit: url.searchParams.get("limit"),
            offset: url.searchParams.get("offset"),
            filter: url.searchParams.get("filter"),
        });

        
        let where = { };
        if (filter === 'groups') {
                where = {
                        userId: user?.id,
                        type: {
                            in: ['joinedGroup']
                        }
                    }
            
            } else if (filter === 'friends') {
                where = {
                        userId: user?.id,
                        type: {
                            in: ['friendRequest', 'acceptFriendRequest']
                        }
                    }
            
            } else if (filter === 'posts') {
                where = {
                        userId: user?.id,
                        type: {
                            in: ['postComment']
                        }
                    }
            
            } else {
                where = {
                    userId: user?.id
                }
            }

            const notifs = await prisma.notification.findMany({
                where: where,
                orderBy: {
                    createdAt: 'desc'
                },
                take: parseInt(limit),
                skip: parseInt(offset),
                include: {
                    fromUser: true,
                    group: true,
                },
            })
        
        

        return new Response(JSON.stringify(notifs))

    } catch (error) {
        return new Response('Could not fetch notifications', { status: 500 })
    }
}

export async function DELETE(req: Request) {
    const url = new URL(req.url);

    const notifId = url.searchParams.get('notifId');

    if (!notifId) return new Response('No notification id provided', { status: 400 });

    try {
        await prisma.notification.delete({
            where: {
                id: notifId,
            }
        });

        return new Response('Notification deleted', { status: 200 })

    } catch (error) {
        return new Response('Could not delete notification', { status: 500 })
    }
}