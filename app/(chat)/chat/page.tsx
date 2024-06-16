import React from 'react'
import Chat from '@/components/home/chat/Chat'

type Props = {}

const page = (props: Props) => {

    return (
        <div className="container mx-auto mt-3 w-5/6 px-12">
            <Chat />
        </div>
    )
}

export default page