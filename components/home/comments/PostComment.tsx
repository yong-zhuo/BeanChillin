"use client";
import UserAvatar from "@/components/common-ui/misc/UserAvatar";
import { formatTimeToNow } from "@/lib/utils";
import { DetailedComment } from "@/types/comment";
import React, { useContext, useRef, useState } from "react";
import CommentVotes from "./CommentVotes";
import { Button } from "@/components/common-ui/shadcn-ui/button";
import { CommentVote } from "@prisma/client";
import { Loader2, MessageSquarePlus, MessageSquareReply, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/common-ui/shadcn-ui/textarea";
import { useClickOutside } from "@/hooks/useClickOutside";
import { UserContext } from "../UserContext";
import { useToast } from "@/components/common-ui/shadcn-ui/toast/use-toast";

interface PostCommentProps {
  comment: DetailedComment;
  votesCount: number;
  currVote: CommentVote | undefined;
  postId: string;
}

const PostComment = ({
  comment,
  votesCount,
  currVote,
  postId,
}: PostCommentProps) => {
  const [isCommenting, setIsCommenting] = useState(false);
  const commentRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState(`@${comment.author.name} `);
  useClickOutside(commentRef, () => setIsCommenting(false));
  const toggleReply = () => setIsCommenting((prev) => !prev);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);
  const router = useRouter();
  const { toast } = useToast();

/*
 const deleteComment = async (commentId: string, replyToId?: string | null) => {
  try {
    const query = `/api/group/posts/comment?comment=${commentId}` + (!!replyToId ? `&replyToId=${replyToId}` : "");
    const response = await fetch(query , {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete comment");
    } else {
      router.refresh();
      
    }
  
  } catch (error) {
    toast({
      title: "Failed to delete comment",
      description: "Please try again later",
      variant: "destructive",
    });
  }

}*/

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
    <div className="flex flex-col" ref={commentRef}>
      <div className="flex items-center">
        <UserAvatar
          user={{
            name: comment.author.name || null,
            imageUrl: comment.author.imageUrl || null,
          }}
          className="h-6 w-6"
        />
        <div className="ml-2 flex items-center gap-x-2">
          <p className="text-sm font-medium text-gray-900 hover:text-gray-500">
            {comment.author.name}
          </p>
          <span className="flex flex-row items-center justify-center gap-0.5 text-gray-900">
            <p className="max-h-40 truncate text-xs text-zinc-500">
              {formatTimeToNow(new Date(comment.createdAt))}
            </p>
          </span>
        </div>
      </div>

      <div className="mt-2 text-sm text-zinc-900" >{comment.content}</div>

      <div className="flex flex-row gap-2 items-center justify-start">
        <CommentVotes
          commentId={comment.id}
          initVotesCount={votesCount}
          initVote={currVote}
        />
        <Button
          variant="ghost"
          className="gap-1 rounded-xl text-xs text-zinc-900 hover:bg-sec"
          onClick={() => {
            //setIsCommenting(true);
            toggleReply();
          }}
        >
          Reply
          <MessageSquareReply className="ml-0.5 h-4 w-4 text-zinc-900" />
        </Button>
        {/*comment.authorId === user?.id ? <div className="-ml-5">
          <Button
            variant="ghost"
            className="gap-1 rounded-xl text-xs text-zinc-900 hover:bg-red-400 hover:text-white"
            onClick={() => {
              //setIsCommenting(true);
              deleteComment(comment.id, comment.replyToId);
            }}
          >
            Delete
            <Trash className="ml-0.5 h-4 w-4" />
          </Button>
        </div>: null*/}
      </div>

      {isCommenting ? (
        <div className="grid w-full gap-1.5">
          <label htmlFor="comment" className="flex flex-row items-center gap-1">
            Replying to{" "}
            <p className="items-center text-pri ">{comment.author.name}</p>
          </label>
          <div className="mt-2">
            <Textarea
              id="comment"
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={1}
              placeholder="Write a comment..."
              className="w-full resize-none"
              disabled={isLoading}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleComment(postId, input, comment.replyToId ?? comment.id);
                }
              }}
            />

            <div className="mt-2 flex justify-end gap-2">
              <Button
                tabIndex={-1}
                variant="default"
                onClick={() => {
                  setIsCommenting(false);
                  setInput("");
                }}
                className="gap-1.5 rounded-xl bg-slate-400 text-white hover:bg-slate-600"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (!input) return;
                  handleComment(postId, input, comment.replyToId ?? comment.id);
                }}
                disabled={input.length === 0}
                className="gap-1.5 rounded-xl bg-pri text-white hover:bg-[#77b8d1]"
              >
                {isLoading ? (
                  <div className="flex flex-row gap-0.5">
                    Sending <Loader2 className="h-5 w-5 animate-spin" />
                  </div>
                ) : (
                  <div className="flex flex-row gap-0.5">
                    Comment <MessageSquareReply className="h-5 w-5" />
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PostComment;
