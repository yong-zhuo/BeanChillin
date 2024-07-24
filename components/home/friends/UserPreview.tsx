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
        <div className="justify-center 1xl:flex 1xl:flex-row 1xl:justify-between">
          <div className="flex items-center flex-col 1xl:flex-row">
            <UserAvatar
              user={{
                name: props.otherUser?.name || null,
                imageUrl: props.otherUser?.imageUrl || null,
              }}
              className="h-16 w-16 rounded-full border-2 border-pri md:h-20 md:w-20"
            />
            <div className="flex w-2/3 flex-col items-center 1xl:w-4/5 1xl:items-start">
              <div className="flex flex-col items-center 1xl:flex xl:flex-row  1xl:items-start xl:items-center">
                  <div className="1xl:ml-4  font-bold 1xl:flex-row text-2xl truncate lg:max-w-[180px] xl:max-w-[200px] 2xl:max-w-[300px] max-w-[30vh]">
                    {props.otherUser?.name}
                  </div>
                  <div className="1xl:ml-4 text-md font-medium text-nowrap">
                    <Badge className="bg-pri">{props.friends} Friends</Badge>
                  </div>
              </div>
              <div className="1xl:ml-4 text-md font-light truncate lg:max-w-[180px] xl:max-w-[200px] 2xl:max-w-[420px] max-w-[30vh]">
                {props.otherUser?.bio}
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col space-x-12  items-center justify-center 1xl:w-fit 1xl:space-x-5 1xl:items-end 1xl:justify-end">
          <Button
            asChild
            className="w-fit bg-pri text-white  transition hover:scale-105 hover:bg-slate-400 hover:shadow-lg"
          >
            <Link href={`/profile/${props.otherUser?.id}`} className="flex flex-row gap-0.5 items-center justify-center">View Profile<UserSearch className="h-5 w-5"/></Link>
          </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default UserPreview;
