"use client";

import { Card, CardContent } from "@/components/common-ui/shadcn-ui/card";
import { Separator } from "@/components/common-ui/shadcn-ui/separator";
import React, { useContext } from "react";
import UserPreview from "../friends/UserPreview";
import { User } from "@prisma/client";
import { UserContext } from "../UserContext";
import { format } from "date-fns";

type AboutProps = {
  description: string | null;
  creator: User | null;
  createdAt: Date;
  members: number;
};

const AboutGroupTab = (props: AboutProps) => {
  const { user } = useContext(UserContext);
  return (
    <Card className="">
      <CardContent className="md:ml-4 md:mr-4">
        <h1 className="mt-4 text-2xl font-semibold">Description</h1>
        <Separator className="bg-pri bg-opacity-30" />
        <p className="text-lg text-gray-400">{props.description}</p>
        <h1 className="mt-4 text-2xl font-semibold">Members</h1>
        <Separator className="bg-pri bg-opacity-30" />
        <p className="text-lg text-gray-400">{props.members} Members</p>
        <h1 className="mt-6 text-2xl font-semibold">Created By</h1>
        <Separator className="bg-pri bg-opacity-30" />
        {props.creator !== user ? (
          <UserPreview
            name="Placeholder"
            friends={500}
            friended={true}
            bio={props.creator?.bio as string}
          />
        ) : (
          "You created this group"
        )}
        <h1 className="mt-6 text-2xl font-semibold">Created At</h1>
        <Separator className="bg-pri bg-opacity-30" />
        <p className="text-lg text-gray-400">
          <time dateTime={props.createdAt.toDateString()}>
            {format(props.createdAt, "MMMM d, yyyy")}
          </time>
        </p>
      </CardContent>
    </Card>
  );
};

export default AboutGroupTab;
