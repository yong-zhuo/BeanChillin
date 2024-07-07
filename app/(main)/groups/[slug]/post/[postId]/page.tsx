import UserAvatar from "@/components/common-ui/misc/UserAvatar";
import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/components/common-ui/shadcn-ui/alert-dialog";
import { Badge } from "@/components/common-ui/shadcn-ui/badge";
import { Button } from "@/components/common-ui/shadcn-ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/common-ui/shadcn-ui/dropdown-menu";
import CommentsSection from "@/components/home/comments/CommentsSection";
import AsyncPostVote from "@/components/home/post-vote/AsyncPostVote";
import PostVoteSkeleton from "@/components/home/post-vote/PostVoteSkeleton";
import DeleteButton from "@/components/home/post/DeleteButton";
import EditorContent from "@/components/home/post/EditorContent";
import FlagPost from "@/components/home/post/FlagPost";
import prisma from "@/lib/prisma";
import { Oauth } from "@/lib/users/OAuth";
import { formatTimeToNow } from "@/lib/utils";
import { Group, Post, User, Vote } from "@prisma/client";
import { group } from "console";
import { Ban, Ellipsis, Loader2 } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

interface PageProps {
  params: {
    postId: string;
    slug: string;
  };
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const page = async ({ params }: PageProps) => {
  let post: (Post & { votes: Vote[]; author: User; group: Group }) | null =
    null;
  const session = await getServerSession(Oauth);
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user.email as string,
    },
  });
  //find post by id
  post = await prisma.post.findFirst({
    where: {
      id: params.postId,
    },
    include: {
      votes: true,
      author: true,
      group: true,
    },
  });

  //if post does not exist, return 404
  if (!post) {
    return notFound();
  }

  async function getData() {
    return await prisma.post.findUnique({
      where: {
        id: params.postId,
      },
      include: {
        votes: true,
      },
    });
  }

  const [mod, banned] = await Promise.all([
    prisma.moderator.findFirst({
      where: {
        userId: user?.id,
        groupId: post.group.id,
      },
    }),
    prisma.bannedUser.findFirst({
      where: {
        groupId: post.group.id,
        userId: user?.id,
      },
    }),
  ]);
  const isCurrUserBanned = !!banned;
  const isCurrUserMod = !!mod;

  return (
    <div>
      <div className="flex h-full flex-col items-center justify-between bg-white sm:flex-row sm:items-start shadow rounded-md">
        <div className="w-full flex-1 rounded-md bg-white p-4 sm:w-0">
          <div className="mt-1 max-h-40 truncate text-xs text-gray-500">
            <div className="flex flex-row">
              <UserAvatar
                user={post.author}
                className="h-12 w-12 border-2 border-pri"
              />
              <div className="ml-4">
                <div className="flex items-center text-sm font-bold text-gray-900 sm:text-lg">
                  <Link
                    href={`/profile/${post.author.id}`}
                    className="hover:underline"
                  >
                    {post.author.name}
                  </Link>
                  {post.author.id === post.group.creatorId ? (
                    <Badge className="ml-1 h-4 w-fit bg-pri text-xs">
                      Owner
                    </Badge>
                  ) : null}
                  <span className="px-1">•</span>
                  {params.slug ? (
                    <>
                      <Link
                        className="text-sm text-pri underline underline-offset-2"
                        href={`/groups/${params.slug}`}
                      >
                        {params.slug}
                      </Link>
                    </>
                  ) : null}

                  {post.author.id === user?.id ||
                  post.group.creatorId === user?.id ||
                  (isCurrUserMod && post.group.creatorId !== post.author.id) ? (
                    <span className="flex flex-row px-1 ">
                      •
                      <DeleteButton
                        postId={post.id}
                        userId={user?.id as string}
                        authorId={post.authorId}
                        group={post.group}
                        isCurrUserMod={isCurrUserMod}
                      />
                    </span>
                  ) : null}
                  {!isCurrUserMod &&
                  post.group.creatorId !== user?.id &&
                  post.author.id !== user?.id &&
                  post.author.id !== post.group.creatorId &&
                  !isCurrUserBanned ? (
                    <span className="flex flex-row px-1">
                      •
                      <FlagPost
                        postId={post.id}
                        userId={user?.id as string}
                        group={post.group}
                        isCurrUserMod={isCurrUserMod}
                      />
                    </span>
                  ) : null}
                </div>
                {formatTimeToNow(new Date(post.createdAt))}
              </div>
            </div>
          </div>
          <h1 className="flex flex-row items-start justify-between py-2 text-xl font-semibold leading-6 text-gray-900">
            {post?.title}
            <div className=" -mt-2 sm:hidden">
              <Suspense fallback={<PostVoteSkeleton />}>
                <AsyncPostVote postId={post?.id} getData={getData} />
              </Suspense>
            </div>
          </h1>

          <EditorContent content={post?.content} />

          {isCurrUserBanned ? (
            <div className="mt-4 flex flex-col gap-y-2">
              <hr className="my-4 h-px w-full border-pri" />
              <div className="text-center italic font-semibold text-red-400">You are banned from commenting on this post</div>
            </div>
          ) : (
            <Suspense
              fallback={
                <Loader2 className="h-5 w-5 animate-spin text-zinc-500" />
              }
            >
              <CommentsSection postId={post?.id} />
            </Suspense>
          )}
        </div>

        <div className="hidden items-start justify-center px-5 pl-0 pt-3 sm:block">
          <Suspense fallback={<PostVoteSkeleton />}>
            <AsyncPostVote postId={post?.id} getData={getData} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default page;
