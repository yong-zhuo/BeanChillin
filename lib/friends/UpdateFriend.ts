"use server"
import { randomUUID } from "crypto";
import prisma from "../prisma";
import CreateFriend from "./CreateFriend";
import FriendData from "./FriendData";
import ReadFriend from "./ReadFriend";


export default async function UpdateFriend(data: FriendData) {
    const { sender_id, receiver_id, status, id } = data;
    if (sender_id === null || sender_id === undefined || receiver_id === null || receiver_id === undefined || status === 'Pending') {//null and undefined checks. If user is pending, it should do nothing.
        return;
    }

    const info = await ReadFriend(data);

    if (info === null) {//record does not exist
        return;
    } else if (info.status === 'Pending' && status === 'Friend') {//user accept friend req
        await prisma.friendship.update({
            where: {
                id: info.id,
            },
            data: {
                status: "Friend"
            }
        })
        const self_id = await prisma.friendship.findFirst({
            where: {
                sender_id,
                receiver_id
            },
            select: {
                id: true
            }
        });
        await prisma.friendship.update({
            where: {
                id: self_id?.id,
            },
            data: {
                status: "Friend",
            }
        })
        return;
    } else if (info.status === 'Pending' && status === 'NotFriend') { //user decline friend req
        await prisma.friendship.update({
            where: {
                id: info.id,
            },
            data: {
                status: "NotFriend"
            }
        });
        return;
    } else if (status === 'NotFriend' && info.status === 'Friend') { //User remove friend
        await prisma.friendship.update({
            where: {
                id: info.id,
            },
            data: {
                status: "NotFriend"
            }
        });

        const self_id = await prisma.friendship.findFirst({
            where: {
                sender_id,
                receiver_id
            },
            select: {
                id: true
            }
        })
        await prisma.friendship.update({
            where: {
                id: self_id?.id,
            },
            data: {
                status: "NotFriend"
            }
        });
        return;
    } else { //Error
        return;
    }
}


