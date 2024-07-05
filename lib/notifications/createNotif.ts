'use server'
import { group } from "console";
import prisma from "../prisma";

export default async function createNotifs(data:any, notifType: string) {
    try {
        switch (notifType) {
            case ("friendRequest"):
                const res = await prisma.notification.create({
                    data: {
                        fromId: data.fromId,
                        userId: data.toId,
                        type: "friendRequest",
                        isRead: false     
                    }
                });
                break;
            case ("acceptFriendRequest"):
                const res2 = await prisma.notification.create({
                    data: {
                        fromId: data.fromId,
                        userId: data.toId,
                        type: "acceptFriendRequest",
                        isRead: false
                    }
                });
                break;
            case ("joinedGroup"):
                const res3 = await prisma.notification.create({
                    data: {
                        fromId: data.fromId,
                        userId: data.toId,
                        type: "joinedGroup",
                        groupId: data.groupId,
                        isRead: false
                    }
                });
                break;
            case ("postComment"):

            const postWithGroup = await prisma.post.findUnique({
                where: {
                    id:data.postId
                },
                include: {
                    group: true
                }
            });

            if (data.fromId === postWithGroup?.authorId) {
                return;
            }

                const res4 = await prisma.notification.create({
                    data: {
                        fromId: data.fromId,
                        userId: postWithGroup?.authorId as string,
                        type: "postComment",
                        postId: data.postId,
                        groupId: postWithGroup?.group?.id,
                        isRead: false
                    }
                });
                break;
        }
    } catch (e) {
        console.log(e);
    }
}