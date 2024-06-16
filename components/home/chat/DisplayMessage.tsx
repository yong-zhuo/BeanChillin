"use client"

import { useEffect, useRef, useState } from "react";
import moment from 'moment';
import Pusher from 'pusher-js';
import React from "react";
import ChatHeader from "./ChatHeader";



export interface ChatSession {
    data: never[] | {
        messages: {
            id: string;
            message: string;
            createdAt: Date;
            sender_id?: string | undefined;
            receiver_id?: string | undefined;
        }[];
        friendship: {
            status: string;
            key: string | null;
            sender_id: string;
            receiver_id: string;
            receiver: {
                name: string | null;
                imageUrl: string | null;
            } | null;
        } | null
    }
}
export default function DisplayMessage({ data }: ChatSession) {
    const friendship = Array.isArray(data) ? null : data?.friendship ? data.friendship : null;
    const messages = Array.isArray(data) ? [] : friendship?.status === 'Friend' ? data?.messages : [];
    const [totalComments, setTotalComments] = useState(messages);
    const messageEndRef = useRef<HTMLInputElement>(null);
    const key = friendship?.key as string || "room1";
    const recipient_name = friendship?.receiver?.name === undefined ? "" : friendship?.receiver?.name;
    const recipient_img = friendship?.receiver?.name === undefined ? "" : friendship?.receiver?.imageUrl;

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="p-6 flex-grow max-h-screen overflow-y-auto">
            <ChatHeader
                params={{ name: recipient_name, imageUrl: recipient_img }}
            />
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