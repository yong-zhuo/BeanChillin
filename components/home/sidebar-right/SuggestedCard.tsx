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

const SuggestedCard = ({name}: {name: string}) => {
  
  return (
    <Card>
      <CardHeader >
        <CardTitle >
            {`Suggested ${name}`}
            <Separator className="bg-pri my-2"/>
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
