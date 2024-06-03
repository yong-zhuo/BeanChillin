import { Card, CardHeader } from "@/components/common-ui/shadcn-ui/card";
import React from "react";
import GroupAvatar from "./GroupAvatar";
import { Separator } from "@/components/common-ui/shadcn-ui/separator";
import Button from "@/components/common-ui/button/Button";
import { Badge } from "@/components/common-ui/shadcn-ui/badge";

//TODO: remove placeholders and add data
type GroupType = "Academic" | "Interest" | "Social" | "Event" | "CCA";
type GroupProps = {
  name?: string;
  members?: number;
  type?: string;
  yourGroup?: boolean;
};
//TODO: Add logic for Groupavatar to have a fallback image
//TODO: Add logic for button to leave group
const GroupPreview = (props: GroupProps) => {
  //badge colours
  const groupColours = {
    Academic: "bg-blue-400",
    Interest: "bg-green-400",
    Social: "bg-yellow-400",
    Event: "bg-red-400",
    CCA: "bg-purple-400",
  };

  const groupColor =
    props.type !== undefined
      ? groupColours[props.type as GroupType]
      : "bg-gray-400";

  return (
    <>
      <Card className="mb-3 mt-3">
        <CardHeader>
          <div className="justify-center md:flex md:flex-row md:justify-between">
            <div className="flex items-center">
              <GroupAvatar
                group={true}
                img="/placeholder/pl1.jpg"
                className="rounded-md border-2 border-pri h-12 w-12 md:h-20 md:w-20"
              />
              <div className="flex w-2/3 flex-col md:w-4/5 items-center md:items-start">
                <div className="ml-4 font-bold md:text-2xl flex flex-col md:flex-row justify-between items-center">
                  {props.name}
                  <Badge className={`ml-2 ${groupColor} h-1/6 md:h-1/4 font-medium`}>{props.type}</Badge>
                </div>
                <div className="ml-4 text-sm font-light">
                  Members: {props.members}
                </div>
              </div>
            </div>
            <div className="flex h-1/4 w-full flex-row space-x-12 md:h-fit md:w-fit md:space-x-5  ">
              <Button
                text="View"
                action="button"
                addClass="bg-pri text-white hover:bg-slate-400 items-center "
              />
              {props.yourGroup ? (
                <Button
                  text="Delete"
                  action="button"
                  addClass="bg-red-400 text-white hover:bg-slate-400 items-center "
                />
              ) : (
                <Button
                  text="Leave "
                  action="button"
                  addClass="bg-red-400 text-white hover:bg-slate-400 items-center"
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
