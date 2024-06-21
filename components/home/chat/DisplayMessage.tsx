"use client"

import { useCallback, useEffect, useRef, useState } from "react";
import moment from 'moment';
import Pusher from 'pusher-js';
import React from "react";
import { INFINITE_SCROLL_MESSAGE } from "@/config";
import { getMessages } from "./Chat";
import { toast } from "@/components/common-ui/shadcn-ui/toast/use-toast";
import { DisplayMessageProps } from "./Chat";


export const dynamic = 'force-dynamic';

export default function DisplayMessage({ data }: DisplayMessageProps) {
    const friendship = Array.isArray(data) ? null : data?.friendship ? data.friendship : null;
    const messages = Array.isArray(data) ? [] : friendship?.status === 'Friend' ? data?.messages : [];
    const [totalComments, setTotalComments] = useState(messages);
    const messageEndRef = useRef<HTMLInputElement>(null);
    const key = friendship?.key as string || "room1";
    const [offset, setOffset] = useState(INFINITE_SCROLL_MESSAGE + 1);
    const [hasMoreMessage, setHasMoreMessage] = useState(true);
    const isFetching = useRef(false); // Ref to track if a fetch is in progress
    const scrollContainerRef = useRef<HTMLDivElement>(null); // Ref for the scrollable container

    const scrollToBottom = () => {

        //should send user to the bottom only on first load. 
        if (scrollContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
            const scrollPositionFromBottom = scrollHeight - scrollTop;
            console.log(scrollPositionFromBottom)
            if (scrollPositionFromBottom <= 4648) {
                messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
            }
        }
    }

    //run only on first load
    /*
    useEffect(() => {
        scrollToBottom();
    }, []);*/

    //For realtime chat
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
            //scrollToBottom();
            pusher.unsubscribe(key);
            pusher.unbind('my-event');
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scrollToBottom, totalComments]);

    const loadMoreMessages = async () => {
        try {
            if (isFetching.current || !hasMoreMessage) return;
            isFetching.current = true;
            const currentScrollPosition = scrollContainerRef.current?.scrollHeight || 0;
            if (hasMoreMessage) {
                const res = await getMessages([friendship?.sender_id as string, friendship?.receiver_id as string], offset);
                if (res.length === 0) {
                    setHasMoreMessage(false);
                }
                setTotalComments((comment) => [...res, ...comment]);
                setOffset((prevOffset) => prevOffset + INFINITE_SCROLL_MESSAGE);
                //TODO: Prevent user from teleporting to the top of the chat after new messages have been loaded. Still abit buggy
                if (scrollContainerRef.current) {
                    scrollContainerRef.current.scrollTop = currentScrollPosition;
                }
            }
        } catch (error) {
            toast({
                title: "Failed to fetch messages",
                description: "Please try again later",
                variant: "destructive",
            });
        } finally {
            isFetching.current = false;
        }
    };

    const handleScroll = useCallback(() => {
        if (scrollContainerRef.current?.scrollTop === 0 && hasMoreMessage && !isFetching.current) {
            loadMoreMessages();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasMoreMessage, offset]);

    //Inf scroll
    useEffect(() => {
        const handleScrollEvent = () => {
            // Trigger function if scrollTop is 0
            if (scrollContainerRef.current?.scrollTop === 0) {
                handleScroll();
            }
        };

        const scrollElement = scrollContainerRef.current;
        if (scrollElement) {
            scrollElement.addEventListener('scroll', handleScrollEvent);
        }

        // Cleanup function
        return () => {
            if (scrollElement) {
                scrollElement.removeEventListener('scroll', handleScrollEvent);
            }
        };
    }, [handleScroll]);

    return (
        <div className="p-6 flex-grow max-h-screen overflow-y-auto h-[67vh] 2mxl:h-[67vh] 2xl:h-[62vh] md:h-[67vh] sm:h-[67vh] scrollbar" ref={scrollContainerRef}>
            <div className="flex flex-col gap-4">
                {totalComments.map((msg, index): JSX.Element => (
                    <React.Fragment key={index}>
                        {
                            friendship?.sender_id === msg.sender_id ?
                                < div key={index} className="flex flex-col items-end" >
                                    <div className="flex ">
                                        <div className="flex text-wrap items-end rounded-lg rounded-tr-none  bg-pri text-white p-2 shadow-md">{msg.message}</div>
                                    </div>
                                    <p className="font-light text-sm text-gray-600">{moment(msg.createdAt as Date).local().calendar()}</p>
                                </div>
                                :
                                < div key={index} className="flex flex-col" >
                                    <div className="flex items-center">
                                        <div className="flex items-end rounded-lg rounded-tl-none bg-gray-500 text-white p-2 shadow-md">{msg.message}</div>
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