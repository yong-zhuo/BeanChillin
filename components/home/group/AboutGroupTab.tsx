import { Card, CardContent } from "@/components/common-ui/shadcn-ui/card";
import { Separator } from "@/components/common-ui/shadcn-ui/separator";
import React from "react";
import UserPreview from "../friends/UserPreview";

type AboutProps = {
  description: string;
  creator: string;
};

const AboutGroupTab = (props: AboutProps) => {
  return (
    <Card className="">
      <CardContent className="md:ml-4 md:mr-4">
        <h1 className="mt-4 text-2xl font-semibold">Description</h1>
        <Separator className="bg-pri bg-opacity-30" />
        <p className="text-lg text-gray-400">{props.description}</p>
        <h1 className="text-2xl font-semibold mt-6">Created By</h1>
        <Separator className="bg-pri bg-opacity-30" />
        <UserPreview name='Kafka' friends={500} friended={true} bio='Hello!'/>
        <h1 className="text-2xl font-semibold mt-6">Created At</h1>
        <Separator className="bg-pri bg-opacity-30" />
        <p className="text-lg text-gray-400">12 June 2023</p>
      </CardContent>
    </Card>
  );
};

export default AboutGroupTab;
