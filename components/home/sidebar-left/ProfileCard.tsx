"use client";

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

const ProfileCard = () => {
  const { user } = useContext(UserContext);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {user ? (
            <div className="flex flex-col justify-between items-center">
              <UserAvatar
                className="h-20 w-20 border-2 border-pri"
                user={{
                  name: user.name || null,
                  imageUrl: user.imageUrl || null,
                }}
              />
              <p className="ml-4">{user.name}</p>
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
          <div className="flex flex-col items-center"><span className="text font-bold pt-1">0 Friends</span></div>
          <Separator className="bg-pri" orientation="vertical" />
          <div className="flex flex-col items-center"><span className="text font-bold pt-1">0 Posts</span></div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default ProfileCard;
