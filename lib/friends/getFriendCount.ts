import { User } from "@prisma/client";
import prisma from "../prisma";



export async function getFriendCount(friends: User[]) {
    const eachFriendCount:Record<string, number> = {}
    for (const friend of friends) {
        const friendCount = await prisma.friendship.findMany({
            where: {
                sender_id: friend.id,
                status: "Friend",
            },
        });
        eachFriendCount[friend.id] = friendCount.length;
    }

    return eachFriendCount;
}