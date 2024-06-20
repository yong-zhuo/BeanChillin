"use client"

import { Button } from '@/components/common-ui/shadcn-ui/button';
import React, { useContext } from 'react'
import { UserContext } from '../UserContext';
import CreateFriend from '@/lib/friends/CreateFriend';
import UpdateFriend from '@/lib/friends/UpdateFriend';
import { useRouter } from 'next/navigation';
import { Clock, UserMinus, UserPlus } from 'lucide-react';

type Props = {
    sender_status: string,
    receiver_status: string,
    receiver_id: string,
}

const FriendRequestButton = (props: Props) => {

    const router = useRouter();

    async function AddFriend() {
        const data = {
            sender_id: user?.id!,
            receiver_id: receiver_id,
            status: 'Friend',
            id: ''
        }
        await CreateFriend(data);
        router.refresh();
    }

    async function Accept() {
        const data = {
            sender_id: user?.id!,
            receiver_id: receiver_id,
            status: 'Friend',
            id: ''
        }
        await UpdateFriend(data);
        router.refresh();
    }

    async function Decline() {
        const data = {
            sender_id: user?.id!,
            receiver_id: receiver_id,
            status: 'NotFriend',
            id: ''
        }
        await UpdateFriend(data);
        router.refresh();
    }


    const { sender_status, receiver_status, receiver_id } = props;
    const { user } = useContext(UserContext);
    return (

        user?.id === receiver_id ? null : //If the user is viewing their own profile
            (
                receiver_status === 'Confirm' ? //If receiver status is pending
                    <Button className='bg-gray-400 w-fit text-white gap-1 flex flex-row items-center justify-center hover:bg-gray-400 hover:scale-105 transition' disabled>Pending<Clock className='h-5 w-5'/></Button>
                    : sender_status === 'Confirm' ? //If receiver status is confirm
                        <div className='flex flex-row justify-between'>
                            <Button className='bg-pri w-fit text-white mr-2' onClick={async () => Accept()}>Accept</Button>
                            <Button className='bg-pri w-fit text-white' onClick={async () => Decline()}>Decline</Button>
                        </div>
                        :
                        (
                            receiver_status === 'Friend' ? //If status is friend
                                <Button className='bg-red-400 w-fit text-white gap-1 flex flex-row items-center justify-center hover:bg-gray-400 hover:scale-105 transition' onClick={async () => Decline()}>Remove Friend <UserMinus className='h-5 w-5'/></Button>
                                :
                                <Button className='bg-pri w-fit text-white gap-1 flex flex-row items-center justify-center hover:bg-gray-400 hover:scale-105 transition' onClick={async () => AddFriend()}>Add Friend<UserPlus className='h-5 w-5'/></Button>
                        )
            )
    )
}

export default FriendRequestButton