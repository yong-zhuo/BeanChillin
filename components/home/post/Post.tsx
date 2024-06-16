"use client";

import UserAvatar from "@/components/common-ui/misc/UserAvatar";
import { formatTimeToNow } from "@/lib/utils";
import type { Post, User, Vote } from "@prisma/client";
import Link from "next/link";

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
}

const Post = ({
  post,
  votesCount,
  groupName,
  currVote,
  commentCount,
}: PostProps) => {
  return (
    <div className="rounded-md bg-white shadow">
      <div className="flex justify-between px-6 py-4">
        <div className="w-0 flex-1">
          <div className="mt-1 max-h-40 text-xs text-gray-500">
            <UserAvatar user={post.author} className="h-12 w-12 border-2 border-pri" />
            {groupName ? (
              <>
                <Link
                  className="text-sm text-zinc-900 underline underline-offset-2"
                  href={`/groups/${groupName}`}
                >
                  {groupName}
                </Link>
                <span className="px-1">•</span>
              </>
            ) : null}
            <span>Posted by {post.author.name}</span>{" "}
            {formatTimeToNow(new Date(post.createdAt))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
