"use client"

import { useEffect, useRef, useState } from "react";
import moment from 'moment';
import Pusher from 'pusher-js';


export interface Props {
    data: {
        message: string;
        User: {
            name: string | null;
        } | null;
        id: string;
        createdAt: Date;
    }[];
}

export default function DisplayMessage({ data }: Props) {
    const [totalComments, setTotalComments] = useState(data);
    const messageEndRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom();
    }, [totalComments]);

    useEffect(() => {
        var pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
            cluster: 'ap1'
        });

        var channel = pusher.subscribe('my-channel');
        channel.bind('my-event', function (data: any) {
            const parsedComments = JSON.parse(data.message);
            setTotalComments((prev) => [...prev, parsedComments]);
        });

        return () => {
            pusher.unsubscribe("my-channel");
        };
    }, []);

    return (
        <div className="p-6 flex-grow max-h-screen overflow-y-auto">
            <div className="flex flex-col gap-4">
                {totalComments.map((msg, index): JSX.Element => (
                    <div key={index}>
                        <div className="flex items-center">
                            <div className="flex items-end rounded-lg bg-white p-4 shadow-md self-start">{msg.message}</div>
                        </div>
                        <p className="font-light text-sm text-gray-600">{moment(msg.createdAt as Date).local().calendar()}</p>
                    </div>
                ))}
                <div ref={messageEndRef}></div>
            </div>
        </div>
    )
}