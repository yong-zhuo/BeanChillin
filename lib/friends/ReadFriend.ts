"use server"
import prisma from "../prisma";
import FriendData from "./FriendData";


export default async function ReadFriend(data: FriendData): Promise<FriendData | null> {
    const { sender_id, receiver_id } = data;
    if (sender_id === null || sender_id === undefined || receiver_id === null || receiver_id === undefined) {
        return null;
    }

    const res = await prisma.friendship.findFirst({
        where: { //You are always trying to check the other party status.
            sender_id: receiver_id,
            receiver_id: sender_id,
        },
        select: {
            id: true,
            sender_id: true,
            receiver_id: true,
            status: true
        },
    })
    return res;
}

