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

            case ("replyComment"):

            const [comment, post] = await Promise.all([
                prisma.comment.findUnique({
                    where: {
                        id: data.replyToId
                    },
                    include: {
                        author: true
                    }
                }),
                prisma.post.findUnique({
                    where: {
                        id: data.postId
                    }, include: {
                        group: true
                    }
                })
                ]);

                if (comment?.authorId === data.fromId) {
                    return;
                }

                const res5 = await prisma.notification.create({
                    data: {
                        fromId: data.fromId,
                        userId: comment?.authorId as string,
                        type: "replyComment",
                        postId: data.postId,
                        groupId: post?.group?.id,
                        isRead: false
                    }
                });

            case ("removeGroupMember"):
                const res6 = await prisma.notification.create({
                    data: {
                        fromId: data.fromId,
                        userId: data.toId,
                        type: "removeGroupMember",
                        groupId: data.groupId,
                        isRead: false
                    }
                });
                break;
            case ("banned"):
                const res7 = await prisma.notification.create({
                    data: {
                        fromId: data.fromId,
                        userId: data.toId,
                        type: "banned",
                        groupId: data.groupId,
                        isRead: false
                    }
                });
                break;
            case ("moderatorAdded"):
                const res8 = await prisma.notification.create({
                    data: {
                        fromId: data.fromId,
                        userId: data.toId,
                        type: "moderatorAdded",
                        groupId: data.groupId,
                        isRead: false
                    }
                });
                break;
            case("deletedPost"):
                const res9 = await prisma.notification.create({
                    data: {
                        fromId: data.fromId,
                        userId: data.toId,
                        type: "deletedPost",
                        postId: data.postId,
                        groupId: data.groupId,
                        isRead: false
                    }
                });
                break;
            
        }
    } catch (e) {
        console.log(e);
    }
}