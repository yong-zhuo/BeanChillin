"use client"

import Button from "@/components/common-ui/button/Button"
import { postData } from "./PostData";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/common-ui/shadcn-ui/textarea";

interface ChatFormProps {
    data: {
        sender_id: string | null | undefined;
        receiver_id: string | null | undefined;
        key: string | null | undefined;
    }
}

export default function ChatForm(data: ChatFormProps) {
    const sender_id = data.data.sender_id as string;
    const receiver_id = data.data.receiver_id as string;
    const key = data.data.key as string;
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault(); // Prevent the default form submission
        const form = event.currentTarget;
        const formData = new FormData(form);
        formData.append("sender_id", sender_id);
        formData.append("receiver_id", receiver_id);
        formData.append("key", key);
        await postData(formData);
        form.reset();
    }

    return (
        <form onSubmit={handleSubmit} className="absolute inset-x-0 bottom-0 bg-white h-[100px]">
            <div className="flex">
                <Textarea
                    name="message"
                    placeholder={key === undefined ? "You are not friends with the user" : "Type your message..."}
                    className=" outline-pri resize-none w-full h-full"
                    disabled={key === undefined ? true : false}
                />
                <div className={cn("px-4 py-2 flex", key === undefined ? "hidden" : "")}>
                    <Button
                        addClass={cn("bg-sec text-pri hover:bg-white border-2 border-pri flex items-center justify-center rounded-full", key === undefined ? "hidden" : "")}
                        width={40}
                        height={40}
                        action="submit"
                        text="Send"
                    />
                </div>
            </div>
        </form>
    )
}