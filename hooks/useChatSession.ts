"use client"
import { useCallback, useState } from "react";


//TODO: THIS IS BROKEN. ERR: It keeps rerendering the react component.
export default function useChatSession(emails: string[]) {
    const [chatSession, setChatSession] = useState<string[]>(emails);

    const setSender = useCallback((email: string) => {
        setChatSession((prevChatSession) => {
            if (prevChatSession[0] === email) return prevChatSession;
            const newChatSession = [...prevChatSession];
            newChatSession[0] = email;
            return newChatSession;
        });
    }, []);

    const setReceiver = useCallback((email: string) => {
        setChatSession((prevChatSession) => {
            if (prevChatSession[1] === email) return prevChatSession;
            return [prevChatSession[0], email];
        });
    }, []);

    const setReceivers = useCallback((email: string[]) => {
        setChatSession((prevChatSession) => {
            const newChatSession = [prevChatSession[0], ...emails];
            if (JSON.stringify(newChatSession) === JSON.stringify(prevChatSession)) return prevChatSession;
            return newChatSession;
        });
    }, []);

    return {
        setSender,
        setReceiver,
        setReceivers,
        chatSession
    };
}