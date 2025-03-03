"use client";

import { Button } from "@/components/common-ui/shadcn-ui/button";
import { postData } from "./PostData";
import TextareaAutosize from "react-textarea-autosize";
import { useRef, useState } from "react";
import { ToastAction } from "@/components/common-ui/shadcn-ui/toast/toast";
import { useToast } from "@/components/common-ui/shadcn-ui/toast/use-toast";
import { ChatFormProps } from "./Chat";
import { Textarea } from "@/components/common-ui/shadcn-ui/textarea";
import { Send } from "lucide-react";

export default function ChatForm({ data }: ChatFormProps) {
  const sender_id = data?.sender_id as string;
  const receiver_id = data?.receiver_id as string;
  const key = data?.key as string;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [input, setInput] = useState<string>("");
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
      setInput("");
      textareaRef.current?.focus();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to send message",
        description: "Something went wrong, please try again later.",
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mb-2 overflow-hidden border-t p-3 pt-4 sm:mb-0 flex flex-row items-center ">
      <Textarea
        ref={textareaRef}
        onKeyDown={async (e) => {
          if (e.key === "Enter" && e.shiftKey === false) {
            e.preventDefault();
            await handleSubmit();
          }
        }}
        rows={3}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        className="sm:text-s block max-h-[60px] scrollbar w-full resize-none overflow-y-auto border border-pri bg-transparent text-gray-900 outline-none placeholder:text-gray-400 focus-within:ring-0 focus:ring-0 sm:py-1.5 sm:leading-6"
      />
      <div className="items-center">
        <Button
          className="bg-transparent text-pri  hover:bg-sec h-1/6 w-fit ml-2 gap-1"
          type="submit"
          onClick={() => handleSubmit()}
          disabled={loading}
        >
          Send <Send className="h-4 w-4 " />
        </Button>
      </div>
      <div
        onClick={() => textareaRef.current?.focus()}
        className=""
        aria-hidden="true"
      ></div>
    </div>
  );
}
