'use client'

import UserAvatar from "@/components/common-ui/misc/UserAvatar";
import { Card, CardHeader } from "@/components/common-ui/shadcn-ui/card";
import { Button } from "@/components/common-ui/shadcn-ui/button";
import { Badge } from "@/components/common-ui/shadcn-ui/badge";
import { User } from "@prisma/client";
import Link from "next/link";
import { UserSearch } from "lucide-react";

type UserPreviewProps = {
  otherUser?: User | null;
  friends?: number;
  friended?: boolean;
  currUser?: User | null;
};

const UserPreview = (props: UserPreviewProps) => {
  //to change useravatar user to creator
  
  return (
    <Card className="mb-3 mt-3">
      <CardHeader>
        <div className="justify-center md:flex md:flex-row md:justify-between">
          <div className="flex items-center flex-col md:flex-row">
            <UserAvatar
              user={{
                name: props.otherUser?.name || null,
                imageUrl: props.otherUser?.imageUrl || null,
              }}
              className="h-16 w-16 rounded-full border-2 border-pri md:h-20 md:w-20"
            />
            <div className="flex w-2/3 flex-col items-center md:w-4/5 md:items-start">
              <div className="lg:flex lg:flex-row lg:items-center">
                  <div className="md:ml-4 flex flex-col items-center justify-between font-bold md:flex-row md:text-2xl">
                    {props.otherUser?.name}
                  </div>
                  <div className="ml-3 md:ml-4 text-md font-medium">
                    <Badge className="bg-pri">{props.friends} Friends</Badge>
                  </div>
              </div>
              <div className="md:ml-4 text-md font-light">
                {props.otherUser?.bio}
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col space-x-12  items-center justify-center md:w-fit md:space-x-5 md:items-end md:justify-end">
          <Button
            asChild
            className="w-fit bg-pri text-white  transition hover:scale-105 hover:bg-slate-400 hover:shadow-lg"
          >
            <Link href={`/profile/${props.otherUser?.name}`} className="flex flex-row gap-0.5 items-center justify-center">View Profile<UserSearch className="h-5 w-5"/></Link>
          </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default UserPreview;
