import { INFINITE_SCROLL_RESULTS } from "@/config";
import prisma from "@/lib/prisma";
import React from "react";
import PostFeed from "../post/PostFeed";

const PopularFeed = async () => {
   
  const posts = await prisma.post.findMany({
    include: {
      _count: {
        select: { comments: true },
      },
      group: true,
      votes: true,
      author: true,
      comments: true,
    },
    orderBy: {
      comments: {
        _count: "desc",
      },
    },
    take: INFINITE_SCROLL_RESULTS,
  });
  return <PostFeed initPosts={posts} feedType="trend" />;
};

export default PopularFeed;