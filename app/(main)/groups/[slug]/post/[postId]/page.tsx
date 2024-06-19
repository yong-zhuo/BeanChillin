import UserAvatar from "@/components/common-ui/misc/UserAvatar";
import { Badge } from "@/components/common-ui/shadcn-ui/badge";
import CommentsSection from "@/components/home/comments/CommentsSection";
import AsyncPostVote from "@/components/home/post-vote/AsyncPostVote";
import PostVoteSkeleton from "@/components/home/post-vote/PostVoteSkeleton";
import EditorContent from "@/components/home/post/EditorContent";
import prisma from "@/lib/prisma";
import { formatTimeToNow } from "@/lib/utils";
import { Group, Post, User, Vote } from "@prisma/client";
import { Loader2 } from "lucide-react";
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

  return (
    <div>
      <div className="flex h-full flex-col items-center justify-between bg-white sm:flex-row sm:items-start">
        <div className="w-full flex-1 rounded-md bg-white p-4 sm:w-0">
          <div className="mt-1 max-h-40 truncate text-xs text-gray-500">
            <div className="flex flex-row">
              <UserAvatar
                user={post.author}
                className="h-12 w-12 border-2 border-pri"
              />
              <div className="ml-4">
                <div className="flex items-center text-lg font-bold text-gray-900">
                  {post.author.name}
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
                </div>
                {formatTimeToNow(new Date(post.createdAt))}
              </div>
            </div>
          </div>
          <h1 className="py-2 text-xl font-semibold leading-6 text-gray-900 flex flex-row justify-start items-start">
            {post?.title}
            <div className=" sm:hidden -mt-2">
              <Suspense fallback={<PostVoteSkeleton />}>
                <AsyncPostVote postId={post?.id} getData={getData} />
              </Suspense>
            </div>
          </h1>

          <EditorContent content={post?.content} />

          <Suspense
            fallback={
              <Loader2 className="h-5 w-5 animate-spin text-zinc-500" />
            }
          >
            <CommentsSection postId={post?.id} />
          </Suspense>
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
