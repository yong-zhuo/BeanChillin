"use client";

import { DetailedPost } from "@/types/post";
import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../UserContext";
import { INFINITE_SCROLL_RESULTS } from "@/config";
import { useToast } from "@/components/common-ui/shadcn-ui/toast/use-toast";
import { useInView } from "react-intersection-observer";
import { Loader2 } from "lucide-react";
import Post from "./Post";

interface PostFeedProps {
  initPosts: DetailedPost[];
  groupName?: string;
  feedType?: "general" | "group" | "user" | "trend" | "popular" | "home";
  authorId?: string;
}

const PostFeed = ({ initPosts, groupName, feedType, authorId }: PostFeedProps) => {
  const [offset, setOffset] = useState(INFINITE_SCROLL_RESULTS);
  const [posts, setPosts] = useState<DetailedPost[]>(initPosts);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [scrollTrigger, isInView] = useInView({
    threshold: 1,
  });
  const { user } = useContext(UserContext);
  const { toast } = useToast();

  const loadMorePosts = async () => {
    try {
      if (hasMoreData) {
        const query =
          `/api/posts?limit=${INFINITE_SCROLL_RESULTS}&offset=${offset}` + (!!feedType ? `&feedType=${feedType}` : "") +
          (!!groupName ? `&groupName=${groupName}` : "") + (!!authorId ? `&groupName=${authorId}` : "");
        const res = await fetch(query);
        const newPosts = (await res.json()) as DetailedPost[];

        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }

        if (newPosts.length === 0) {
          setHasMoreData(false);
        }
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        setOffset((prevOffset) => prevOffset + INFINITE_SCROLL_RESULTS);
      }
    } catch (error) {
      toast({
        title: "Failed to fetch posts",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (isInView && hasMoreData) {
      loadMorePosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView, hasMoreData]);

  return (
    <ul className="col-span-2 flex flex-col space-y-6">
      {posts.map((post, index) => {
        const votesCount = post.votes.reduce((acc, vote) => {
          if (vote.type === "UPVOTE") {
            return acc + 1;
          }
          if (vote.type === "DOWNVOTE") {
            return acc - 1;
          }
          return acc;
        }, 0);

        const currVote = post.votes.find((vote) => vote.userId === user?.id);

        if (index === posts.length - 1) {
          return (
            <li key={post.id} ref={scrollTrigger}>
              <Post
                post={post}
                commentCount={post.comments.length}
                groupName={post.group.name}
                votesCount={votesCount}
                currVote={currVote}
                groupCreatorId={post.group.creatorId as string}
              />
            </li>
          );
        } else {
          return (
            <Post
              key={post.id}
              post={post}
              commentCount={post.comments.length}
              groupName={post.group.name}
              votesCount={votesCount}
              currVote={currVote}
              groupCreatorId={post.group.creatorId as string}
            />
          );
        }
      })}

      {hasMoreData && (
        <li className="flex justify-center" ref={scrollTrigger}>
          Loading
          <Loader2 className="h-6 w-6 animate-spin text-zinc-500" />
        </li>
      )}
    </ul>
  );
};

export default PostFeed;
