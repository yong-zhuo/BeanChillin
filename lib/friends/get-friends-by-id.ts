import prisma from "../prisma";

export const getFriendsById = async (id: string) => {

    try {
        const dbFriends = await prisma.friendship.findMany({
            where: {
                sender_id: id,
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