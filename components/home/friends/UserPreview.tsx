'use client'

import UserAvatar from "@/components/common-ui/misc/UserAvatar";
import { Card, CardHeader } from "@/components/common-ui/shadcn-ui/card";
import Button from "@/components/common-ui/button/Button";
import { UserMinus, UserPlus } from "lucide-react";
import { Badge } from "@/components/common-ui/shadcn-ui/badge";
import { User } from "@prisma/client";

type UserPreviewProps = {
  creator?: User | null;
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
                name: props.creator?.name || null,
                imageUrl: props.creator?.imageUrl || null,
              }}
              className="h-16 w-16 rounded-full border-2 border-pri md:h-20 md:w-20"
            />
            <div className="flex w-2/3 flex-col items-center md:w-4/5 md:items-start">
              <div className="lg:flex lg:flex-row lg:items-center">
                  <div className="md:ml-4 flex flex-col items-center justify-between font-bold md:flex-row md:text-2xl">
                    {props.creator?.name}
                  </div>
                  <div className="md:ml-4 text-md font-medium">
                    <Badge className="bg-pri">{props.friends} Friends</Badge>
                  </div>
              </div>
              <div className="md:ml-4 text-md font-light">
                {props.creator?.bio}
              </div>
            </div>
          </div>
          <div className="flex h-1/4 w-full flex-row space-x-12 md:h-fit md:w-fit md:space-x-5 items-center justify-center">
            {props.friended ? (
              <Button
                text="Unfriend"
                action="button"
                addClass="bg-red-400 text-white hover:bg-slate-400 items-center w-fit hover:shadow-lg hover:scale-105 transition"
              >
                <UserMinus className="h-5 w-5" />
              </Button>
            ) : (
              <Button
                text="Friend"
                action="button"
                addClass="bg-pri text-white hover:bg-slate-400 items-center w-fit hover:shadow-lg hover:scale-105 transition"
              >
                <UserPlus className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default UserPreview;
