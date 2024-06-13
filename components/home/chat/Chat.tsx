
import prisma from "@/lib/prisma";
import ChatForm from "./ChatForm";
import DisplayMessage from "./DisplayMessage";
import { ScrollArea } from "@/components/common-ui/shadcn-ui/scroll-area";
import { useEffect } from "react";


export async function getMessages(emails: string[]) {

    try {
        const data = await prisma.message.findMany({
            where: {
                email: emails[0],
                receiver_id: emails[1],
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
        return data;
    }
    catch (e) {
        console.log(e);
        return [];
    }
}

export const dynamic = 'force-dynamic';


//TODO: CHANGE STATIC INFO
export default async function Chat() {

    const data = await getMessages(['beanchillin3@gmail.com', 'admin1@gmail.com']);

    return (

        <ScrollArea className="bg-sec flex flex-col justify-center h-[1160px]">
            <DisplayMessage
                data={data}
            />
            <ChatForm />
        </ScrollArea>
    )
}