import { INFINITE_SCROLL_RESULTS } from "@/config";
import prisma from "@/lib/prisma";
import React from "react";
import PostFeed from "../post/PostFeed";

const TrendFeed = async () => {
   
  const posts = await prisma.post.findMany({
    include: {
      _count: {
        select: { votes: true },
      },
      group: true,
      votes: true,
      author: true,
      comments: true,
    },
    orderBy: {
      votes: {
        _count: "desc",
      },
    },
    take: INFINITE_SCROLL_RESULTS,
  });
  return <PostFeed initPosts={posts} feedType="trend" />;
};

export default TrendFeed;
