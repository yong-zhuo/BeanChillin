"use client";

import UserAvatar from "@/components/common-ui/misc/UserAvatar";
import { formatTimeToNow } from "@/lib/utils";
import type { Post, User, Vote } from "@prisma/client";
import { MessageSquareText } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import EditorContent from "./EditorContent";
import { Badge } from "@/components/common-ui/shadcn-ui/badge";
import PostVote from "../post-vote/PostVote";

type PartialVote = Pick<Vote, "type">;

interface PostProps {
  post: Post & {
    author: User;
    votes: Vote[];
  };
  votesCount: number;
  groupName: string;
  currVote?: PartialVote;
  commentCount: number;
  groupCreatorId?: string;
}

const Post = ({
  post,
  votesCount,
  groupName,
  currVote,
  commentCount,
  groupCreatorId,
}: PostProps) => {
  const postRef = useRef<HTMLDivElement>(null);

  return (
    <div className="rounded-md bg-white shadow">
      <div className="flex justify-between px-5 py-4">
        
        <div className="w-0 flex-1">
          <div className="mt-1 max-h-40 text-xs text-gray-500">
            <div className="flex flex-row">
              <UserAvatar
                user={post.author}
                className="h-12 w-12 border-2 border-pri"
              />
              <div className="ml-4">
                <div className="flex items-center text-lg font-bold text-gray-900">
                  {post.author.name}
                  {post.author.id === groupCreatorId ? (
                    <Badge className="ml-1 h-4 w-fit bg-pri text-xs">
                      Owner
                    </Badge>
                  ) : null}
                  <span className="px-1">•</span>
                  {groupName ? (
                    <>
                      <Link
                        className="text-sm text-pri underline underline-offset-2"
                        href={`/groups/${groupName}`}
                      >
                        {groupName}
                      </Link>
                    </>
                  ) : null}
                </div>
                {formatTimeToNow(new Date(post.createdAt))}
              </div>
            </div>
          </div>
          <Link href={`/groups/${groupName}/post/${post.id}`}>
            <h1 className="py-2 text-lg font-semibold leading-6 text-gray-900">
              {post.title}
            </h1>
          </Link>

          <div
            className="relative max-h-40 w-full overflow-clip text-sm"
            ref={postRef}
          >
            <EditorContent content={post.content} />
            {postRef.current && postRef.current?.clientHeight === 160 ? (
              <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent" />
            ) : null}
          </div>
        </div>
        <div className="flex items-start justify-center">
          <PostVote
            initVotesCount={votesCount}
            postId={post.id}
            initVote={currVote?.type}
          />
        </div>
      </div>
      

      <div className="z-20 bg-gray-50 px-4 py-4 text-sm sm:px-6">
        <Link
          href={`/groups/${groupName}/post/${post.id}`}
          className="flex w-fit items-center gap-2"
        >
          <MessageSquareText className="h-5 w-5" />
          {commentCount} comments
        </Link>
      </div>
    </div>
  );
};

export default Post;
