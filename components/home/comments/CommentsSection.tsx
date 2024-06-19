import prisma from "@/lib/prisma";
import { Oauth } from "@/lib/users/OAuth";
import { getServerSession } from "next-auth";
import React from "react";
import PostComment from "./PostComment";
import CreateComment from "./CreateComment";

interface CommentSectionProps {
  postId: string;
}

const CommentsSection = async ({ postId }: CommentSectionProps) => {
  const session = await getServerSession(Oauth);

  const [comments, user] = await Promise.all([
    prisma.comment.findMany({
      where: {
        postId,
        replyToId: null,
      },
      include: {
        author: true,
        CommentVote: true,
        replies: {
          include: {
            author: true,
            CommentVote: true,
          },
        },
      },
    }),
    prisma.user.findUnique({
      where: {
        email: session?.user.email as string,
      },
    }),
  ]);

  return (
    <div className="mt-4 flex flex-col gap-y-2">
      <hr className="my-4 h-px w-full border-pri" />
      <CreateComment postId={postId}/>
      <div className="mt-4 flex flex-col gap-y-6">
        {comments
          .filter((comment) => !comment.replyToId)
          .map((topComments) => {
            //for top level comments
            const topCommentsCount = topComments.CommentVote.reduce(
              (acc, vote) => {
                if (vote.type === "UPVOTE") {
                  return acc + 1;
                }
                if (vote.type === "DOWNVOTE") {
                  return acc - 1;
                }
                return acc;
              },
              0,
            );

            const topCommentsVote = topComments.CommentVote.find(
              (vote) => vote.userId === user?.id,
            );

            return (
              <div key={topComments.id} className="flex flex-col">
                <div className="mb-2">
                  <PostComment
                    comment={topComments}
                    currVote={topCommentsVote}
                    votesCount={topCommentsCount}
                    postId={postId}
                  />
                </div>
                {
                  //for replies to top level comments
                  topComments.replies
                    .sort(
                      (r1, r2) => r2.CommentVote.length - r1.CommentVote.length,
                    ) //for most upvoted comments
                    .map((reply) => {
                      const replyVotesCount = reply.CommentVote.reduce(
                        (acc, vote) => {
                          if (vote.type === "UPVOTE") {
                            return acc + 1;
                          }
                          if (vote.type === "DOWNVOTE") {
                            return acc - 1;
                          }
                          return acc;
                        },
                        0,
                      );

                      const replyVote = reply.CommentVote.find(
                        (vote) => vote.userId === user?.id,
                      );

                      return (
                        <div
                          key={reply.id}
                          className="ml-2 border-l-2 border-[#77b8d1] py-2 pl-4"
                        >
                          <PostComment
                            comment={reply}
                            currVote={replyVote}
                            votesCount={replyVotesCount}
                            postId={postId}
                          />
                        </div>
                      );
                    })}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CommentsSection;
