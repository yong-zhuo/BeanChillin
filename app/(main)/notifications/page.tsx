import { Button } from "@/components/common-ui/shadcn-ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/common-ui/shadcn-ui/tabs";
import NotifFeed from "@/components/home/notifications/NotifFeed";
import NotifPreview from "@/components/home/notifications/NotifPreview";
import { INFINITE_SCROLL_RESULTS } from "@/config";
import prisma from "@/lib/prisma";
import { Oauth } from "@/lib/users/OAuth";
import { formatTimeToNow } from "@/lib/utils";
import { DetailedNotif } from "@/types/notification";
import {
  Grid2x2Check,
  StickyNote,
  Trash,
  UserCheck,
  Users,
} from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

const page = async () => {
  const session = await getServerSession(Oauth);
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user.email as string,
    },
  });

  const initNotifications = (await prisma.notification.findMany({
    where: {
      userId: user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: INFINITE_SCROLL_RESULTS,
    include: {
      fromUser: true,
      group: true,
    },
  })) as DetailedNotif[];

  return (
    <div className="mx-auto mt-3 w-full sm:container sm:w-5/6 sm:px-16">
      <h2 className="mb-3 flex flex-row items-center justify-center gap-2 text-3xl font-extrabold sm:justify-normal">
        Notifications
        <Image src="/home/bell.svg" alt="notification" width={30} height={30} />
      </h2>
      <Tabs defaultValue="all" className="mt-2 ">
        <TabsList className="flex w-fit items-center justify-start   bg-white shadow">
          <TabsTrigger value="all" className="flex gap-2">
            All <Grid2x2Check className="hidden h-5 w-5 sm:block" />
          </TabsTrigger>
          <TabsTrigger value="posts" className="flex gap-2">
            Posts <StickyNote className="hidden h-5 w-5 sm:block" />
          </TabsTrigger>
          <TabsTrigger value="groups" className="flex gap-2">
            Groups <Users className="hidden h-5 w-5 sm:block" />
          </TabsTrigger>
          <TabsTrigger value="friends" className="flex gap-2">
            Friends <UserCheck className="hidden h-5 w-5 sm:block" />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <NotifFeed initNotifications={initNotifications} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
