"use server"
import { getServerSession } from "next-auth";
import prisma from "../prisma";
import { Oauth } from "../users/OAuth";

export const getFriendsById = async () => {

    const session = await getServerSession(Oauth);
    const email = session?.user?.email as string;
    try {
        const findId = await prisma.user.findUnique({
            where: {
                email: email
            },
        });

        const userId = findId?.id as string;

        const dbFriends = await prisma.friendship.findMany({
            where: {
                sender_id: userId,
                status: 'Friend'
            },
            select: {
                key: true,
                receiver_id: true,
                receiver: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        imageUrl: true,
                    }
                },
            }
        });

        return dbFriends;
    }
    catch (e) {
        console.log(e);
        return [];
    }
}