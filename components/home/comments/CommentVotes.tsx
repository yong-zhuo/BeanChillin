"use client";
import { Button } from "@/components/common-ui/shadcn-ui/button";
import usePrevious from "@/hooks/usePrevious";
import { cn } from "@/lib/utils";
import { CommentVote, VoteType } from "@prisma/client";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { useToast } from "@/components/common-ui/shadcn-ui/toast/use-toast";
import { useRouter } from "next/navigation";

type PartialVote = Pick<CommentVote, "type">;

interface CommentVotesProps  {
  commentId: string;
  initVotesCount: number;
  initVote?: PartialVote;
};

const CommentVotes = ({
  commentId,
  initVotesCount,
  initVote,
}: CommentVotesProps) => {
  const [votesCount, setVotesCount] = useState<number>(initVotesCount);
  const [currVote, setCurrVote] = useState(initVote);
  const [isVoting, setIsVoting] = useState(false);
  const prevVote = usePrevious(currVote);
  const {user} = useContext(UserContext);
  const {toast} = useToast();
  const router = useRouter();

  useEffect(() => {
    setCurrVote(initVote);
  }, [initVote]);

  const handleVote = async (type: any) => {

    //prevent multiple votes
    if (isVoting) return;

    setIsVoting(true);

    const payload = {
      voteType: type,
      commentId: commentId,
      userId:user?.id
    };

    //optimistic update for votes
    if (currVote?.type === type) {
        setCurrVote(undefined);

        if(type === 'UPVOTE') {
            setVotesCount((prevCount) => prevCount - 1);
        } else if (type === 'DOWNVOTE') {
            setVotesCount((prevCount) => prevCount + 1);
        }
    } else {
        setCurrVote({type});

        if(type === 'UPVOTE') {
            setVotesCount((prevCount) => prevCount + (currVote ? 2 : 1));
        } else if (type === 'DOWNVOTE') {
            setVotesCount((prevCount) => prevCount - (currVote ? 2 : 1));
        }
    }

    try {
      const response = await fetch("/api/group/posts/comment/vote", {
        method: "PATCH",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to vote");

      } 

      if(response.ok) {
        router.refresh();
      }

    } catch (error) {
        //revert optimistic update
        if (type === 'UPVOTE') {
            setVotesCount((prevCount) => prevCount - 1);
        } else  {
            setVotesCount((prevCount) => prevCount + 1);
        }
        setCurrVote(prevVote);

        toast({
            title: "Failed to vote",
            description: "Please try again later",
            variant: "destructive",
        
        })
        
    } finally {
        setIsVoting(false);
    }
  };

  return (
    <div className="flex flex-row pl-0 sm:w-12  sm:gap-1 sm:pb-0  items-center">
      <Button onClick={() => handleVote('UPVOTE')} size="icon" variant="ghost" aria-label="UPVOTE">
        <ArrowBigUp
          className={cn("h-5 w-5 text-zinc-700", {
            "fill-pri text-pri": currVote?.type === "UPVOTE",
          })}
        />
      </Button>
      <p className="m-0 sm:mr-0 py-2 text-center text-sm font-medium text-zinc-900">
        {votesCount}
      </p>
      <Button onClick={() => handleVote('DOWNVOTE')} size="icon" variant="ghost" aria-label="DOWNVOTE">
        <ArrowBigDown
          className={cn("h-5 w-5 text-zinc-700", {
            "fill-red-400 text-red-400": currVote?.type === "DOWNVOTE",
          })}
        />
      </Button>
    </div>
  );
};

export default CommentVotes;
