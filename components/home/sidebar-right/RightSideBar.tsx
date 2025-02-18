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
import { Construction, UserSearch } from "lucide-react";
import SuggestedGroupPreview from "./SuggestedGroupPreview";
import { group } from "console";

 
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

  const groupsJoined = await prisma.membership.findMany({
    where: {
      userId: user?.id,
    },
    select: {
      groupId: true
    }
  });
  const groups_joined = groupsJoined.map((group) => group.groupId);

  
  let users;
  let groups;

  groups = await prisma.group.findMany({
    skip: groupSkip,
    take: 6,
  });

  users = await prisma.user.findMany({
    skip: userSkip,
    take: 6,
    where: {
      id: {
        not: user?.id,
      },
    },
  });

  /**
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

  const groupsJoined = await prisma.membership.findMany({
    where: {
      userId: user?.id,
    },
    select: {
      groupId: true
    }
  });
  const groups_joined = groupsJoined.map((group) => group.groupId);

  
  let users;
  let groups;
  const groupQuery = `https://beanchillin-ml.onrender.com/recommend_groups`;
  const groupRes = await fetch(groupQuery, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: user?.id,
      groups_joined: groups_joined,
    }),
  });


  if (groupRes.ok) {
    const groupReco = await groupRes.json();
    groups = await prisma.group.findMany({
      where: {
        id: {
          in: groupReco.recommendation,
        },
      },
      take: 6
    });
  } else {
    groups = await prisma.group.findMany({
      skip: groupSkip,
      take: 6,
    });
  }

  const userQuery = `https://beanchillin-ml.onrender.com/recommend_friends`;
  const userRes = await fetch(userQuery, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: user?.id,
    }),
  });

  if (userRes.ok) {
    const reco = await userRes.json();
    users = await prisma.user.findMany({
      where: {
        id: { in: reco }
      },
      take: 6
    });
  } else {
    users = await prisma.user.findMany({
      skip: userSkip,
      take: 6,
      where: {
        id: {
          not: user?.id,
        },
      },
    });
  }

  */

  return (
    <div className="sticky mb-2 mt-10 hidden w-1/4 flex-col justify-start space-y-16 pt-12 lg:block">
      <Card className="">
        <CardHeader>
          <CardTitle className="flex flex-row gap-2 2mxl:text-xl 2xl:text-lg text-md items-center">
            Suggested Groups <UserSearch className="h-5 w-5" />
          </CardTitle>
          <Separator className="my-2 bg-pri" />
        </CardHeader>
        <CardContent className="font-semibold flex flex-row items-center justify-center gap-1">
          {<ScrollArea className="h-[200px] w-full">
            {groups.map((group) => (
              <SuggestedGroupPreview group={group} key={group.id} />
            ))}
          </ScrollArea>}
        </CardContent>
      </Card>
      <Card className="">
        <CardHeader>
          <CardTitle className="flex flex-row gap-2 2mxl:text-xl 2xl:text-lg text-md items-center">
            Suggested Friends <UserSearch className="h-5 w-5  " />
          </CardTitle>
          <Separator className="mt-2 bg-pri" />
        </CardHeader>
        <CardContent className="font-semibold flex flex-row items-center justify-center gap-1">
          {<ScrollArea className="h-[200px] w-full">
            {users.map((user) => (
              <SuggestedFriendPreview otherUser={user} key={user.id} />
            ))}
          </ScrollArea>}
        </CardContent>
      </Card>
    </div>
  );
};

export default RightSideBar;
