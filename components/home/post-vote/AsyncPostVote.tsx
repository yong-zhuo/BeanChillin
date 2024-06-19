import prisma from "@/lib/prisma";
import { Oauth } from "@/lib/users/OAuth";
import { Post, Vote, VoteType } from "@prisma/client";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import React from "react";
import PostVote from "./PostVote";

interface AsyncPostVoteProps {
  postId: string;
  initVotesCount?: number;
  initVote?: VoteType | null;
  getData?: () => Promise<(Post & { votes: Vote[] }) | null>;
}

const AsyncPostVote = async ({
  postId,
  initVotesCount,
  initVote,
  getData,
}: AsyncPostVoteProps) => {
  const session = await getServerSession(Oauth);

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
  });

  //to test suspense
  //const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

  let votesCount: number = 0;
  let currVote: VoteType | null | undefined = undefined;

  if (getData) {
    //await wait(2000);
    const post = await getData();
    if (!post) {
        return notFound();
    }

    votesCount = post.votes.reduce((acc, vote) => {
        if (vote.type === "UPVOTE") {
            return acc + 1;
        }
        if (vote.type === "DOWNVOTE") {
            return acc - 1;
        }
        return acc
    }, 0)

    currVote = post.votes.find((vote) => vote.userId === user?.id)?.type;
  } else {
    //to be used as props for PostVote component
    votesCount = initVotesCount as number;
    currVote = initVote;
  }

  return <PostVote postId={postId} initVotesCount={votesCount} initVote={currVote}/>;
};

export default AsyncPostVote;
