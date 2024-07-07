import { INFINITE_SCROLL_RESULTS } from "@/config";
import prisma from "@/lib/prisma";
import React from "react";
import PostFeed from "../post/PostFeed";
import { getServerSession } from "next-auth";
import { Oauth } from "@/lib/users/OAuth";

const MemberFeed = async () => {
  const session = await getServerSession(Oauth);
  let followedGroupIds: string[] = [];
  const followedGroups = await prisma.membership.findMany({
    where: {
      user: {
        email: session?.user?.email,
      },
    },
    include: {
      group: true,
    },
  });
  followedGroupIds = followedGroups.map((group) => group.group.id);
  //get posts from followed groups
  const posts = await prisma.post.findMany({
    where: {
      group: {
        id: {
          in: followedGroupIds
        },
      },
    },
    orderBy: {
        createdAt: "desc",
    },
    include: {
        votes: true,
        author: true,
        comments: true,
        group: true,
    },
    take: INFINITE_SCROLL_RESULTS
  });


  return <PostFeed initPosts={posts} feedType="group" />;
};

export default MemberFeed;
