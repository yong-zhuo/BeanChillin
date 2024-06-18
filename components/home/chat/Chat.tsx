"use server"
import prisma from "@/lib/prisma";
import ChatForm from "./ChatForm";
import DisplayMessage from "./DisplayMessage";
import { messaageArrayValidator } from "@/lib/schemas/messageSchema";
import ChatHeader from "./ChatHeader";

interface ChatParams {
    sender_id: string;
    receiver_id: string;
}

export interface ChatFormProps {
    data: {
        sender_id: string;
        receiver_id: string;
        status: string;
        key: string | null;
        receiver: {
            name: string | null;
            imageUrl: string | null;
        } | null;
    } | null
}

export interface ChatListProps {
    friends: {
        receiver: {
            id: string | null;
            name: string | null;
            email: string | null;
            imageUrl: string | null;
        } | null;
        key: string | null;
    }[]
}

export async function getMessages(ids: string[], offset: number) {
    try {
        const dbMessages = await prisma.message.findMany({
            where: {
                OR: [{
                    sender_id: ids[0],
                    receiver_id: ids[1]
                },
                {
                    sender_id: ids[1],
                    receiver_id: ids[0]
                }]
            },
            select: {
                message: true,
                id: true,
                createdAt: true,
                sender_id: true,
                receiver_id: true
            },
            orderBy: {
                createdAt: "desc",
            },
            take: 50,
            skip: offset,
        });

        const messages = messaageArrayValidator.parse(dbMessages);

        return messages.reverse();
    }
    catch (e) {
        console.log(e);
        return [];
    }
}

export async function getFriendship(ids: string[]) {

    try {
        const friendship = await prisma.friendship.findFirst({
            where: {
                sender_id: ids[0],
                receiver_id: ids[1]
            },
            select: {
                key: true,
                status: true,
                sender_id: true,
                receiver_id: true,
                receiver: {
                    select: {
                        name: true,
                        imageUrl: true
                    }
                }
            }
        });

        return friendship;
    } catch (e) {
        console.log(e);
        return null;
    }
}

export default async function Chat({ params }: { params: ChatParams }) {
    const { sender_id, receiver_id } = params;
    const messages = await getMessages([sender_id, receiver_id], 0); //set offset to 0 as it is inital message
    const friendship = await getFriendship([sender_id, receiver_id]);
    const recipient_name = friendship?.receiver?.name === undefined ? "" : friendship?.receiver?.name;
    const recipient_img = friendship?.receiver?.name === undefined ? "" : friendship?.receiver?.imageUrl;
    const data = {
        messages: messages,
        friendship: friendship
    };

    return (
        <div className="bg-sec flex flex-col justify-center h-full">
            <ChatHeader
                params={{ name: recipient_name, imageUrl: recipient_img }}
            />
            <DisplayMessage
                data={data}
            />
            <ChatForm
                data={friendship}
            />
        </div>
    )
}
