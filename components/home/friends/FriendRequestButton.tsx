"use client"

import { Button } from '@/components/common-ui/shadcn-ui/button';
import React, { useContext } from 'react'
import { UserContext } from '../UserContext';
import CreateFriend from '@/lib/friends/CreateFriend';
import UpdateFriend from '@/lib/friends/UpdateFriend';

type Props = {
    sender_status: string,
    receiver_status: string,
    receiver_id: string,
}

const FriendRequestButton = (props: Props) => {

    async function AddFriend() {
        const data = {
            sender_id: user?.id!,
            receiver_id: receiver_id,
            status: 'Friend',
            id: ''
        }
        await CreateFriend(data);
    }

    async function Accept() {
        const data = {
            sender_id: user?.id!,
            receiver_id: receiver_id,
            status: 'Friend',
            id: ''
        }
        await UpdateFriend(data);
    }

    async function Decline() {
        const data = {
            sender_id: user?.id!,
            receiver_id: receiver_id,
            status: 'NotFriend',
            id: ''
        }
        await UpdateFriend(data);
    }


    const { sender_status, receiver_status, receiver_id } = props;
    const { user } = useContext(UserContext);
    return (

        user?.id === receiver_id ? null : //If the user is viewing their own profile
            (
                receiver_status === 'Confirm' ? //If receiver status is pending
                    <Button className='bg-pri w-fit text-white disabled'>Pending</Button>
                    : sender_status === 'Confirm' ? //If receiver status is confirm
                        <div className='flex flex-row justify-between'>
                            <Button className='bg-pri w-fit text-white mr-2' onClick={async () => Accept()}>Accept</Button>
                            <Button className='bg-pri w-fit text-white' onClick={async () => Decline()}>Decline</Button>
                        </div>
                        :
                        (
                            receiver_status === 'Friend' ? //If status is friend
                                <Button className='bg-pri w-fit text-white' onClick={async () => Decline()}>Remove Friend</Button>
                                :
                                <Button className='bg-pri w-fit text-white' onClick={async () => AddFriend()}>Add Friend</Button>
                        )
            )
    )
}

export default FriendRequestButton