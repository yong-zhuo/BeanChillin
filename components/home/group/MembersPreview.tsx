"use client";

import UserAvatar from "@/components/common-ui/misc/UserAvatar";
import { Card, CardHeader } from "@/components/common-ui/shadcn-ui/card";
import { Button } from "@/components/common-ui/shadcn-ui/button";
import { Badge } from "@/components/common-ui/shadcn-ui/badge";
import { Group, Moderator, User } from "@prisma/client";
import Link from "next/link";
import { CircleOff, UserSearch } from "lucide-react";
import ManageMemberButton from "./ManageMemberButton";
import { useState } from "react";
import { useToast } from "@/components/common-ui/shadcn-ui/toast/use-toast";
import { set } from "date-fns";
import { unbanUser } from "@/lib/group/groupActions";
import { useRouter } from "next/navigation";

type MembersPreviewProps = {
  otherUser?: User | null;
  friends?: number;
  friended?: boolean;
  currUser?: User | null;
  group?: Group | null;
  isModerator?: boolean;
  forBan?: boolean;
  isCurrUserMod?: boolean;
};

const MembersPreview = (props: MembersPreviewProps) => {
  //to change useravatar user to creator
  const [isUnbanned, setIsUnbanned] = useState(false);
 
  const {toast} = useToast();
  const router = useRouter();
  const handleUnban = async () => {
 
    try {
      setIsUnbanned(true);
      await unbanUser(props.group?.id as string, props.otherUser?.id as string);
      toast({
        title: "Unbanned user successfully",
        description: `${props.otherUser?.name} has been unbanned from ${props.group?.name}`,
        variant: "event",
      });
    } catch (error) {
      setIsUnbanned(false);
  
      toast({
        title: "Failed to unban user",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      router.refresh();
    }
  
  }
  
  return (
    isUnbanned ? null :<Card className="mb-3 mt-3">
      <CardHeader>
        <div className="justify-center md:flex md:flex-row md:justify-between">
          <div className="flex flex-col items-center md:flex-row">
            <UserAvatar
              user={{
                name: props.otherUser?.name || null,
                imageUrl: props.otherUser?.imageUrl || null,
              }}
              className="h-16 w-16 rounded-full border-2 border-pri md:h-20 md:w-20"
            />
            <div className="flex w-2/3 flex-col items-center md:w-4/5 md:items-start">
              <div className="flex flex-col items-center justify-center sm:justify-normal md:flex-row lg:flex lg:items-center">
                <div className="flex flex-col items-center justify-between truncate font-bold md:ml-4 md:flex-row md:text-2xl">
                  {props.otherUser?.name}
                </div>
                <div className="text-md space-x-2 text-nowrap font-medium md:ml-4 ">
                  <Badge className="bg-pri">{props.friends} Friends</Badge>
                  {props.otherUser?.id === props.group?.creatorId ? (
                    <Badge className="bg-pri">Owner</Badge>
                  ) : props.isModerator ? (
                    <Badge className="bg-green-400">Mod</Badge>
                  ) : null}
                </div>
              </div>
              <div className="text-md font-light md:ml-4">
                {props.otherUser?.bio}
              </div>
            </div>
          </div>
          {!props.forBan ? (
            <div className="flex w-full flex-row  items-center  justify-center space-x-5 md:w-fit md:items-end md:justify-end md:space-x-5">
              {props.otherUser?.id === props.currUser?.id ? null : props
                  .currUser?.id === props.group?.creatorId || (props.isCurrUserMod && (props.group?.creatorId !== props.otherUser?.id && !props.isModerator ))
                 ? (
                <ManageMemberButton
                  member={props.otherUser as User}
                  group={props.group as Group}
                  currUser={props.currUser as User}
                  isModerator={props.isModerator}
                />
              ) : null}
              
              <Button
                asChild
                className="w-fit text-wrap bg-pri text-white  shadow transition hover:scale-105 hover:bg-slate-400 hover:shadow-lg sm:text-nowrap"
              >
                <Link
                  href={`/profile/${props.otherUser?.id}`}
                  className="flex flex-row items-center justify-center gap-0.5"
                >
                  View Profile
                  <UserSearch className="h-8 w-8 sm:h-5 sm:w-5" />
                </Link>
              </Button>
            </div>
          ) : (
           <div className="flex w-full flex-row  items-center  justify-center space-x-5 md:w-fit md:items-end md:justify-end md:space-x-5">
              <Button onClick={() => handleUnban()} className="gap-0.5 w-fit text-wrap bg-red-400 text-white shadow transition hover:scale-105 hover:bg-red-500 sm:text-nowrap">
                Unban <CircleOff className="h-8 w-8 sm:h-5 sm:w-5"/>
              </Button>
              <Button
                asChild
                className="w-fit text-wrap bg-pri text-white  shadow transition hover:scale-105 hover:bg-slate-400 hover:shadow-lg sm:text-nowrap"
              >
                <Link
                  href={`/profile/${props.otherUser?.id}`}
                  className="flex flex-row items-center justify-center gap-0.5"
                >
                  View Profile
                  <UserSearch className="h-8 w-8 sm:h-5 sm:w-5" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
    </Card>
  );
};

export default MembersPreview;
