"use server"
import prisma from "../prisma";
import ReadFriend from "./ReadFriend";
import FriendData from "./FriendData";

export default async function CreateFriend(data: FriendData) {

    const { sender_id, receiver_id, status } = data;
    if (sender_id === null || sender_id === undefined || receiver_id === null || receiver_id === undefined || status === null || status === undefined || status === 'NotFriend' || status === 'Pending' || status === 'Confirm') { //null and undefined checks
        return null;
    }

    try {
        const info = await ReadFriend(data);
        //If there is a record and there is either a friend request or are friends
        if (info !== null && info.status !== 'NotFriend') {
            return null;
        } else {//There isnt a record and the sender wants to be friends OR there is a record, but they are not friends

            const self_id = await prisma.friendship.findFirst({
                where: {
                    sender_id,
                    receiver_id
                },
                select: {
                    id: true
                }
            })

            if (self_id === null) { //if there is no record, make one

                const res = await prisma.friendship.create({
                    data: {
                        sender_id,
                        receiver_id,
                        status: 'Pending',
                        key: sender_id + "-" + receiver_id,
                    }
                });//Create 2 records for both users, Key HAS to be a common key
                const res2 = await prisma.friendship.create({
                    data: {
                        sender_id: receiver_id,
                        receiver_id: sender_id,
                        status: 'Confirm',
                        key: sender_id + "-" + receiver_id,
                    }
                });

            } else {
                const res = await prisma.friendship.update({
                    where: {
                        id: self_id.id
                    },
                    data: {
                        sender_id,
                        receiver_id,
                        status: 'Pending',
                    }
                });

                const res2 = await prisma.friendship.update({
                    where: {
                        sender_id_receiver_id: {
                            sender_id: receiver_id,
                            receiver_id: sender_id,
                        },
                    },
                    data: {
                        status: 'Confirm',
                    }
                });
            }
        }
    } catch (e) {
        console.log(e);
    }
}