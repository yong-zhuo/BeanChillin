import React from 'react'
import Chat from '@/components/home/chat/Chat'
import { getServerSession } from 'next-auth'
import { CustomSessionUser, Oauth } from '@/lib/users/OAuth'
import prisma from '@/lib/prisma'

interface Props {
    params: {
        chatId: string
    }
}
export const dynamic = 'force-dynamic';
const page = async ({ params }: Props) => {
    const { chatId } = params;
    const session = await getServerSession(Oauth);

    if (!session?.user) {
        return null;
    }
    const id = await prisma.user.findUnique({
        where: {
            email: session.user.email as string
        }
    });

    const [userId1, userId2] = chatId.split('-');
    const UserId = id?.id === undefined ? '' : id.id;
    const otherUserId = userId1 === id?.id ? userId2 : userId1;

    return (
        <div className="sm:container mx-auto -mt-2 w-6/6 sm:px-12 h-full sm:h-fit">
            {
                otherUserId !== 'chat' && (//otherUserId will always be chat upon opening chat as its determined by the path.
                    <Chat
                        params={{ sender_id: UserId, receiver_id: otherUserId === undefined ? '' : otherUserId }}
                    />
                )
            }
        </div>
    )
}

export default page