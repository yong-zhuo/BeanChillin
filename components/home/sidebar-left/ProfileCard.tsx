"use server";

import UserAvatar from "@/components/common-ui/misc/UserAvatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/common-ui/shadcn-ui/card";
import { UserContext } from "../UserContext";
import { useContext } from "react";
import Image from "next/image";
import { Separator } from "@/components/common-ui/shadcn-ui/separator";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { Oauth } from "@/lib/users/OAuth";

const ProfileCard = async () => {
  //const { user } = useContext(UserContext);
  const session = await getServerSession(Oauth);
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
  });
  const Nposts = await prisma.post.count({
    where: {
      authorId: user?.id,
    },
  });

  const Nfriends = await prisma.friendship.count({
    where: {
      sender_id: user?.id,
      status: "Friend",
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {user ? (
            <div className="flex flex-col items-center justify-between">
              <UserAvatar
                className="h-20 w-20 border-2 border-pri"
                user={{
                  name: user.name || null,
                  imageUrl: user.imageUrl || null,
                }}
              />
              <p className="mt-1  text-lg text-center">{user.name}</p>
            </div>
          ) : (
            <div className="flex items-center">
              <Image
                src="/misc/loading.svg"
                alt="loading"
                height={80}
                width={80}
              />
              <p className="ml-4">Loading...</p>
            </div>
          )}
        </CardTitle>
        <Separator className="bg-pri" />
        <div className="flex h-9 items-center justify-evenly space-x-4 text-sm">
          <div className="flex flex-col items-center">
            <span className="text-md pt-1 font-bold text-center">{Nfriends} {Nfriends === 1 ? 'Friend' : 'Friends'}</span>
          </div>
          <Separator className="bg-pri" orientation="vertical" />
          <div className="flex flex-col items-center">
            <span className="text-md pt-1 font-bold text-center">{Nposts} {Nposts === 1 ? 'Post' : 'Posts'}</span>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default ProfileCard;
