"use client"
import { useState } from "react";


//TODO: THIS IS BROKEN. ERR: It keeps rerendering the react component.
export default function useChatSession() {
    const [chatSession, setChatSession] = useState<string[]>(["", ""]);

    const setSender = (email: string) => {
        setChatSession(() => {
            const newChatSession = [...chatSession];
            newChatSession[0] = email;
            return newChatSession;
        })
    }

    const setReceiver = (email: string) => {
        setChatSession([chatSession[0], email])
    }

    const setReceivers = (email: string[]) => {
        setChatSession([chatSession[0], ...email])
    }

    return {
        setSender,
        setReceiver,
        setReceivers,
        chatSession
    }
}