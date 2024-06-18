"use client"
import UserAvatar from "@/components/common-ui/misc/UserAvatar";
import { Button } from "@/components/common-ui/shadcn-ui/button";
import useChatSession from "@/hooks/useChatSession";
import { Message } from "@/lib/schemas/messageSchema";
import { User } from "@prisma/client";
import * as Tabs from '@radix-ui/react-tabs';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { ChatListProps } from "./Chat";

const ChatList = ({ friends }: ChatListProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const [unseenMessages, setUnseenMessages] = useState<Message[]>([]);

    return (
        <ul role='list' className='max-h-[25rem] overflow-y-auto -mx-2 space-y-1'>
            {friends.map((friend, index) => {
                return (
                    <li key={index} className="border-b-2">
                        <Button asChild className="flex flex-row justify-between" variant={"default"}>
                            <Link href={`/chat/${friend.key}`} className="gap-2">
                                <UserAvatar user={{ name: friend?.receiver?.name || null, imageUrl: friend?.receiver?.imageUrl || null }} />
                                <div className="text-lg">{friend.receiver?.name}</div>
                            </Link>
                        </Button>
                    </li>
                );
            })}
        </ul>
    );
};

export default ChatList;
