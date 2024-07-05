"use client";
import { Button } from "@/components/common-ui/shadcn-ui/button";
import { Textarea } from "@/components/common-ui/shadcn-ui/textarea";
import { useToast } from "@/components/common-ui/shadcn-ui/toast/use-toast";
import { set } from "date-fns";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import {
  Loader2,
  MessageSquareDot,
  MessageSquarePlus,
  Router,
} from "lucide-react";
import { useRouter } from "next/navigation";
import createNotifs from "@/lib/notifications/createNotif";

interface CreateCommentProps {
  postId: string;
  replyToId?: string;
}

const CreateComment = ({ postId, replyToId }: CreateCommentProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const { toast } = useToast();
  const { user } = useContext(UserContext);
  const router = useRouter();
  const handleComment = async (
    postId: string,
    content: string,
    replyToId?: string,
  ) => {
    setIsLoading(true);
    const payload = {
      postId,
      content,
      replyToId,
      userId: user?.id,
    };

    try {
      const response = await fetch("/api/group/posts/comment", {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to post comment");
      } else {
        router.refresh();
        setInput("");
        const notif = {
          fromId: user?.id,
          postId: postId ,
          type: "postComment",
        };
        
        await createNotifs(notif, 'postComment')
      }
    } catch (error) {
      toast({
        title: "Failed to post comment",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid w-full gap-1.5">
      <label htmlFor="comment" className="hidden font-semibold" />
      <div className="mt-2">
        <Textarea
          id="comment"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          rows={1}
          placeholder="Write a comment..."
          className="w-full resize-none"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleComment(postId, input, replyToId);
            }
          }}
        />

        <div className="mt-2 flex justify-end">
          <Button
            disabled={input.length === 0}
            onClick={() => handleComment(postId, input, replyToId)}
            className="gap-1.5 rounded-xl bg-pri text-white hover:bg-[#77b8d1]"
            
          >
            {isLoading ? (
              <div className="flex flex-row gap-0.5">
                Sending <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            ) : (
              <div className="flex flex-row gap-0.5">
                Comment <MessageSquarePlus className="h-5 w-5" />
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateComment;
