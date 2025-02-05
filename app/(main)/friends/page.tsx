import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/common-ui/shadcn-ui/tabs";
import UserPreview from "@/components/home/friends/UserPreview";
import { getFriendCount } from "@/lib/friends/getFriendCount";
import prisma from "@/lib/prisma";
import { Oauth } from "@/lib/users/OAuth";
import { User } from "@prisma/client";
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
  const transformedFriendList = friendList.map((friend) => friend.receiver) as User[]
  const friendListCount = await getFriendCount(transformedFriendList);

  const friendRequest = await prisma.friendship.findMany({
    where: {
      receiver_id: user?.id,
      status: "Pending",
    },
    include: {
      sender: true,
    },
  });

  const transformedFriendRequest = friendRequest.map((friend) => friend.sender) as User[]
  const friendRequestCount = await getFriendCount(transformedFriendRequest);

  return (
    <div className="container mx-auto mt-3 w-full sm:w-5/6 lg:px-12">
      <h2 className="flex flex-row items-center gap-2 text-3xl font-extrabold sm:justify-normal justify-center">
        Friends
        <Image src="/misc/friends.svg" alt="group" width={30} height={30} />
      </h2>
      <Tabs className="my-6" defaultValue="Your Friends">
        <TabsList className="text-semibold grid grid-cols-2 bg-white shadow">
          <TabsTrigger value="Your Friends">Your Friends</TabsTrigger>
          <TabsTrigger value="Friend Requests">
            <div className="relative">
              Friend Requests
              {friendRequest.length <= 0 ? null : (
                <div className="absolute -right-4 bottom-2 flex aspect-square h-3.5 w-3.5 items-center  justify-center rounded-full bg-red-400 text-sm ">
                  <p className="mb-1 mt-1 text-center text-xs text-white">
                    {friendRequest.length}
                  </p>
                </div>
              )}
            </div>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Your Friends">
          {friendList.map((friend) => (
            <UserPreview
              key={friend?.receiver?.id}
              otherUser={friend?.receiver}
              friends={friendListCount[friend?.receiver?.id as string] || 0}
            />
          ))}
        </TabsContent>
        <TabsContent value="Friend Requests">
          {friendRequest.map((friend) => (
            <UserPreview
              key={friend?.sender?.id}
              otherUser={friend?.sender}
              friends={friendRequestCount[friend?.sender?.id as string] || 0}
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
