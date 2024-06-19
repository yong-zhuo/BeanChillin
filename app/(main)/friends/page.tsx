import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/common-ui/shadcn-ui/tabs";
import UserPreview from "@/components/home/friends/UserPreview";
import prisma from "@/lib/prisma";
import { Oauth } from "@/lib/users/OAuth";
import { getServerSession } from "next-auth";
import Image from "next/image";

const page = async () => {
  const session = await getServerSession(Oauth);

  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email,
    },
  });

  const friendList = await prisma.friendship.findMany({
    where: {
      sender_id: user?.id,
      status: "Friend",
    },
    select: {
      receiver: true,
    },
  });
  console.log(friendList.length);
  const friendRequest = await prisma.friendship.findMany({
    where: {
      receiver_id: user?.id,
      status: "Pending",
    },
    include: {
      sender: true,
    },
  });

  return (
    <div className="container mx-auto mt-3 w-5/6 px-12">
      <h2 className="flex flex-row items-center gap-2 text-3xl font-extrabold">
        Friends
        <Image src="/misc/friends.svg" alt="group" width={30} height={30} />
      </h2>
      <Tabs className="my-6" defaultValue="Your Friends">
        <TabsList className="text-semibold grid grid-cols-2 bg-white shadow">
          <TabsTrigger value="Your Friends">Your Friends</TabsTrigger>
          <TabsTrigger value="Friend Requests">Friend Requests</TabsTrigger>
        </TabsList>
        <TabsContent value="Your Friends">
          {friendList.map((friend) => (
            <UserPreview
              key={friend?.receiver?.id}
              otherUser={friend?.receiver}
              friends={friendList.length}
            />
          ))}
        </TabsContent>
        <TabsContent value="Friend Requests">
          {friendRequest.map((friend) => (
            <UserPreview
              key={friend?.sender?.id}
              otherUser={friend?.sender}
              friends={friendList.length}
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
