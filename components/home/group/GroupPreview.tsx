'use client'
import { Card, CardHeader } from "@/components/common-ui/shadcn-ui/card";
import React from "react";
import GroupAvatar from "./GroupAvatar";
import { Separator } from "@/components/common-ui/shadcn-ui/separator";
import Button from "@/components/common-ui/button/Button";
import { Badge } from "@/components/common-ui/shadcn-ui/badge";
import GroupBadge from "./GroupBadge";
import { GroupType } from "@/types/groupType";
import { redirect, useRouter } from "next/navigation";

//TODO: remove placeholders and add data

type GroupProps = {
  name?: string;
  members?: number;
  type?: GroupType;
  yourGroup?: boolean;
};
//TODO: Add logic for Groupavatar to have a fallback image
//TODO: Add logic for button to leave group
const GroupPreview = (props: GroupProps) => {
  //badge colours
  const router = useRouter();

  return (
    <>
      <Card className="mb-3 mt-3">
        <CardHeader>
          <div className="justify-center xl:flex xl:flex-row xl:justify-between">
            <div className="flex items-center">
              <GroupAvatar
                group={true}
                img="/placeholder/pl3.png"
                className="rounded-md border-2 border-pri h-16 w-16 xl:h-20 xl:w-20"
              />
              <div className="flex w-2/3 flex-col xl:w-4/5 items-center lg:items-start">
                <div className="ml-4 font-bold xl:text-2xl flex flex-col lg:flex-row justify-between items-center">
                  {props.name}
                  <GroupBadge type={props.type}/>
                </div>
                <div className="ml-4 text-sm font-light">
                  Members: {props.members}
                </div>
              </div>
            </div>
            <div className="flex h-1/4 w-full flex-row space-x-12 xl:h-fit xl:w-fit xl:space-x-5  ">
              <Button
                text="View"
                action="button"
                addClass="bg-pri text-white hover:bg-slate-400 items-center hover:shadow-lg hover:scale-105 transition"
                handleClick={() => {router.push(`/groups/${props.name}`)}}
              />
              {props.yourGroup ? (
                <Button
                  text="Delete"
                  action="button"
                  addClass="bg-red-400 text-white hover:bg-slate-400 items-center hover:shadow-lg hover:scale-105 transition"
                />
              ) : (
                <Button
                  text="Leave "
                  action="button"
                  addClass="bg-red-400 text-white hover:bg-slate-400 items-center hover:shadow-lg hover:scale-105 transition"
                />
              )}
            </div>
          </div>
        </CardHeader>
      </Card>
      <Separator className="bg-pri" />
    </>
  );
};

export default GroupPreview;
