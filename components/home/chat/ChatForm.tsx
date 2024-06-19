"use client"

import Button from "@/components/common-ui/button/Button"
import { postData } from "./PostData";
import TextareaAutosize from "react-textarea-autosize";
import { useRef, useState } from "react";
import { ToastAction } from "@/components/common-ui/shadcn-ui/toast/toast";
import { useToast } from "@/components/common-ui/shadcn-ui/toast/use-toast";
import { ChatFormProps } from "./Chat";


export default function ChatForm({ data }: ChatFormProps) {
    const sender_id = data?.sender_id as string;
    const receiver_id = data?.receiver_id as string;
    const key = data?.key as string;
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [input, setInput] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const { toast } = useToast();

    async function handleSubmit() {
        setLoading(true);
        const formData = new FormData();
        formData.append("message", input);
        formData.append("sender_id", sender_id);
        formData.append("receiver_id", receiver_id);
        formData.append("key", key);
        try {
            await postData(formData);
            setInput('');
            textareaRef.current?.focus();
        }
        catch (error) {
            toast({
                variant: "destructive",
                title: "Failed to send message",
                description: "Something went wrong, please try again later.",
                action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
            });
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className='border-t p-3 pt-4 mb-2 sm:mb-0 overflow-hidden'>
            <div className='relative flex-1 rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 bottom-0 left-0 overflow-hidden'>
                <TextareaAutosize ref={textareaRef} onKeyDown={async (e) => {
                    if (e.key === 'Enter' && e.shiftKey === false) {
                        e.preventDefault();
                        await handleSubmit();
                    }
                }}
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className='block w-full resize-none border-none bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 focus-within:ring-0 outline-none sm:py-1.5 overflow-hidden sm:text-s sm:leading-6 max-h-[80px]'
                />
                <div
                    onClick={() => textareaRef.current?.focus()}
                    className='py-2'
                    aria-hidden='true'>
                    <div className='py-px'>
                        <div className='h-9' />
                    </div>
                </div>
                <div className='absolute right-0 bottom-0 flex justify-between py-2 pl-3 pr-2 '>
                    <div className='flex-shrink-0'>
                        <Button state={loading} handleClick={handleSubmit} action='submit' width={10} height={10}>Send</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}