"use client"

import Button from "@/components/common-ui/button/Button"
import { postData } from "./PostData";
import useChatSession from "@/hooks/useChatSession";
export default function ChatForm() {
    const { chatSession, setSender, setReceiver } = useChatSession();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault(); // Prevent the default form submission
        const form = event.currentTarget;
        const formData = new FormData(form);
        formData.append("sender_id", 'beanchillin3@gmail.com');
        formData.append("receiver_id", 'admin1@gmail.com');
        await postData(formData);
        form.reset();
    }

    return (
        <form onSubmit={handleSubmit} className="absolute inset-x-0 bottom-0 bg-white h-[100px]">
            <div className="flex">
                <input type="text" name="message" placeholder="Type your message..." className="flex-grow outline-pri h-[100px]" />
                <div className="px-4 py-2 flex">
                    <Button
                        addClass="bg-sec text-pri hover:bg-white border-2 border-pri flex items-center justify-center rounded-full"
                        width={50}
                        height={40}
                        action="submit"
                        text="Send"
                    />
                </div>
            </div>
        </form>
    )
}