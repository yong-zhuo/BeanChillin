import React from 'react'
import Chat from '@/components/home/chat/Chat'
import { getServerSession } from 'next-auth'
import { CustomSessionUser, Oauth } from '@/lib/users/OAuth'

interface Props {
    params: {
        chatId: string
    }
}

const page = async ({ params }: Props) => {
    const { chatId } = params;
    const session = await getServerSession(Oauth);

    if (!session?.user) {
        return null;
    }
    const customSession = session.user as CustomSessionUser;

    const [userId1, userId2] = chatId.split('-');
    const UserId = customSession.id === undefined ? '' : customSession.id;
    const otherUserId = userId1 === customSession.id ? userId2 : userId1;
    return (
        <div className="container mx-auto mt-3 w-5/6 px-12">
            <Chat
                params={{ sender_id: UserId, receiver_id: otherUserId === undefined ? '' : otherUserId }}
            />
        </div>
    )
}

export default page