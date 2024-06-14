"use client"

import { useEffect, useRef, useState } from "react";
import moment from 'moment';
import Pusher from 'pusher-js';
import React from "react";



export interface ChatSession {
    data: never[] | {
        messages: {
            message: string;
            id: string;
            sender_id: string | null;
            receiver_id: string | null;
            User: {
                name: string | null;
            } | null;
            createdAt: Date;
        }[];
        friendship: {
            key: string;
            status: string;
            sender_id: string | null;
        } | null;
    }
}
export default function DisplayMessage({ data }: ChatSession) {
    const friendship = Array.isArray(data) ? null : data?.friendship ? data.friendship : null;
    const messages = Array.isArray(data) ? [] : friendship?.status === 'Friend' ? data?.messages : [];
    const [totalComments, setTotalComments] = useState(messages);
    const messageEndRef = useRef<HTMLInputElement>(null);
    const key = friendship?.key as string || "room1";
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

        var channel = pusher.subscribe(key);
        channel.bind('my-event', function (data: any) {
            const parsedComments = JSON.parse(data.message);
            setTotalComments((prev) => [...prev, parsedComments]);
        });

        return () => {
            pusher.unsubscribe(key);
        };
    }, []);

    return (
        <div className="p-6 flex-grow max-h-screen overflow-y-auto">
            <div className="flex flex-col gap-4">
                {totalComments.map((msg, index): JSX.Element => (
                    <React.Fragment key={index}>
                        {
                            friendship?.sender_id === msg.sender_id ?
                                < div key={index} className="flex flex-col items-end" >
                                    <div className="flex items-center">
                                        <div className="flex items-end rounded-lg bg-pri text-white p-4 shadow-md">{msg.message}</div>
                                    </div>
                                    <p className="font-light text-sm text-gray-600">{moment(msg.createdAt as Date).local().calendar()}</p>
                                </div>
                                :
                                < div key={index} className="flex flex-col" >
                                    <div className="flex items-center">
                                        <div className="flex items-end rounded-lg bg-gray-500 text-white p-4 shadow-md">{msg.message}</div>
                                    </div>
                                    <p className="font-light text-sm text-gray-600">{moment(msg.createdAt as Date).local().calendar()}</p>
                                </div>
                        }
                    </React.Fragment>
                ))}
                <div ref={messageEndRef}></div>
            </div>
        </div >
    )
}