"use client";

import UserAvatar from "@/components/common-ui/misc/UserAvatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/common-ui/shadcn-ui/card";
import { ScrollArea } from "@/components/common-ui/shadcn-ui/scroll-area";
import { Separator } from "@/components/common-ui/shadcn-ui/separator";
import UserPreview from "../friends/UserPreview";

const SuggestedCard = ({ name }: { name: string }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {`Suggested ${name}`}
          <Separator className="my-2 bg-pri" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default SuggestedCard;
