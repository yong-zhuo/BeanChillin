
import prisma from "@/lib/prisma";
import ChatForm from "./ChatForm";
import DisplayMessage from "./DisplayMessage";
import { ScrollArea } from "@/components/common-ui/shadcn-ui/scroll-area";
import { useEffect } from "react";
import { symbol } from "zod";



export async function getMessages(emails: string[]) {

    try {
        const messages = await prisma.message.findMany({
            where: {
                OR: [{
                    sender_id: emails[0],
                    receiver_id: emails[1]
                },
                {
                    sender_id: emails[1],
                    receiver_id: emails[0]
                }]
            },
            select: {
                message: true,
                id: true,
                createdAt: true,
                user: {
                    select: {
                        name: true
                    }
                },
                sender_id: true,
                receiver_id: true
            },
            orderBy: {
                createdAt: "asc",
            },
            take: 50,
        });

        const friendship = await prisma.friendship.findFirst({
            where: {
                sender_id: emails[0],
                receiver_id: emails[1]
            },
            select: {
                key: true,
                status: true,
                sender_id: true,
                receiver_id: true,
            }
        });
        const data = {
            messages: messages,
            friendship: friendship
        }
        return data;
    }
    catch (e) {
        console.log(e);
        return [];
    }
}

export const dynamic = 'force-dynamic';

export default async function Chat() {
    const data = await getMessages(['beanchillin3@gmail.com', 'Dragon@gmail.com']);
    const dataMessage = Array.isArray(data) ? [] : data?.messages ? data.messages : [];
    const dataFriendship = Array.isArray(data) ? null : data?.friendship ? data.friendship : null;
    const obj = {
        sender_id: dataFriendship?.sender_id,
        receiver_id: dataFriendship?.receiver_id,
        key: dataFriendship?.key
    }
    return (

        <ScrollArea className="bg-sec flex flex-col justify-center h-[1160px]" id="chat">
            <DisplayMessage
                data={data}
            />
            <ChatForm
                data={obj}
            />
        </ScrollArea>
    )
}