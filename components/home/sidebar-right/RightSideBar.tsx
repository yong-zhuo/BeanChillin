import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common-ui/shadcn-ui/card";
import { Separator } from "@/components/common-ui/shadcn-ui/separator";
import { ScrollArea } from "@/components/common-ui/shadcn-ui/scroll-area";
import prisma from "@/lib/prisma";
import { Oauth } from "@/lib/users/OAuth";
import { getServerSession } from "next-auth";
import SuggestedFriendPreview from "./SuggestedFriendPreview";
import { UserSearch } from "lucide-react";
import SuggestedGroupPreview from "./SuggestedGroupPreview";

const RightSideBar = async () => {
  const session = await getServerSession(Oauth);
  const [groupsCount, userCount] = await Promise.all([
    prisma.group.count(),
    prisma.user.count(),
  ]);
  const maxGroupSkip = Math.max(0, groupsCount - 7);
  const maxUserSkip = Math.max(0, userCount - 7);
  const groupSkip =
    maxGroupSkip > 0 ? Math.floor(Math.random() * maxGroupSkip) : 0;
  const userSkip = maxUserSkip > 0 ? Math.floor(Math.random() * maxUserSkip) : 0;
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
  });

  const groups = await prisma.group.findMany({
    skip: groupSkip,
    take: 6,
  });
  const users = await prisma.user.findMany({
    skip: userSkip,
    take: 6,
    where: {
      id: {
        not: user?.id,
      },
    },
  });

  return (
    <div className="sticky mb-2 mt-10 hidden w-1/4 flex-col justify-start space-y-16 pt-12 lg:block">
      <Card className="">
        <CardHeader>
          <CardTitle className="flex flex-row gap-2 2mxl:text-xl 2xl:text-lg text-lg items-center">
            Suggested Groups <UserSearch className="h-5 w-5" />
          </CardTitle>
          <Separator className="my-2 bg-pri" />
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px] w-full">
            {groups.map((group) => (
              <SuggestedGroupPreview group={group} key={group.id} />
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
      <Card className="">
        <CardHeader>
          <CardTitle className="flex flex-row gap-2 2mxl:text-xl 2xl:text-lg text-lg items-center">
            Suggested Friends <UserSearch className="h-5 w-5  "/>
          </CardTitle>
          <Separator className="mt-2 bg-pri" />
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px] w-full">
            {users.map((user) => (
              <SuggestedFriendPreview otherUser={user} key={user.id} />
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default RightSideBar;
