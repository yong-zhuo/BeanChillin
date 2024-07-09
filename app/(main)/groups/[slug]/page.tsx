import { AspectRatio } from "@/components/common-ui/shadcn-ui/aspect-ratio";
import { Card, CardContent } from "@/components/common-ui/shadcn-ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/common-ui/shadcn-ui/tabline";
import AboutGroupTab from "@/components/home/group/AboutGroupTab";
import CreatePost from "@/components/home/post/CreatePost";
import { INFINITE_SCROLL_RESULTS } from "@/config";
import prisma from "@/lib/prisma";
import { Oauth } from "@/lib/users/OAuth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import Image from "next/image";
import GroupAvatar from "@/components/home/group/GroupAvatar";
import GroupBadge from "@/components/home/group/GroupBadge";
import MembershipButton from "@/components/home/group/MembershipButton";
import { GroupType } from "@/types/groupType";
import PostFeed from "@/components/home/post/PostFeed";
import MembersList from "@/components/home/group/MembersList";
import { Ban } from "lucide-react";
import { Button } from "@/components/common-ui/shadcn-ui/button";
import { VideoCall } from "@/components/home/discussion_rooms/VideoCall";

export const metadata = {
  title: "Groups | BeanChillin",
  description: "Welcome to BeanChillin!",
};

interface PageProps {
  params: {
    slug: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const session = await getServerSession(Oauth);
  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email,
    },
  });
  const { slug } = params;

  //find group by slug
  const group = await prisma.group.findFirst({
    where: { name: slug },
    include: {
      Creator: true,
      posts: {
        include: {
          author: true,
          votes: true,
          comments: true,
          group: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: INFINITE_SCROLL_RESULTS,
      },
    },
  });

  //find status of user
  const [membership, banned] = await Promise.all([
    prisma.membership.findFirst({
      where: {
        group: {
          name: slug,
        },
        user: {
          email: session?.user?.email,
        },
      },
    }),
    prisma.bannedUser.findFirst({
      where: {
        groupId: group?.id,
        userId: user?.id,
      },
    }),

  ]);

  const isMember = !!membership;
  const isBanned = !!banned;


  const [memberships, bannedUsers] = await Promise.all([
    prisma.membership.findMany({
      where: {
        group: {
          name: slug,
        },
      },
      include: {
        user: true,
      },
    }),
    prisma.bannedUser.findMany({
      where: {
        group: {
          name: slug,
        }
      },
      include: {
        user: true
      }
    }),
  ]);

  const members = memberships.map((member) => member.user);
  const bannedUsersList = bannedUsers.map((bannedUser) => bannedUser.user);

  const friendCount = await prisma.friendship.count({
    where: {
      sender_id: group?.creatorId as string,
      status: "Friend",
    },
  });

  if (!group) return notFound();

  return (
    <div>
      <Card className="relative rounded-b-none  border-b-2 border-b-pri">
        <div className="mx-auto mt-6 w-11/12">
          <AspectRatio ratio={3 / 1}>
            <Image
              src={group.banner || "/placeholder/pl2.jpg"}
              alt="Banner"
              fill
              className="rounded-md border-2 border-pri object-cover"
              priority={true}
            />
          </AspectRatio>
          <GroupAvatar
            group
            img={group.picture || "/placeholder/pl3.png"}
            className="lg:-translate-y- absolute bottom-0 aspect-square h-14 w-14 -translate-y-20 translate-x-1/3 transform rounded-lg border-2 border-pri lg:h-20 lg:w-20 lg:translate-x-1/3"
          />
        </div>
        <CardContent className="-ml-1 flex items-center justify-between pt-8 md:ml-4">
          <div className="truncate text-2xl font-semibold">
            {group.name} <GroupBadge type={group.type as GroupType} />
          </div>
          {isBanned ? (
            <Button
              variant={"outline"}
              disabled
              className="gap-1 bg-red-400 text-white  xl:mr-3"
            >
              Banned <Ban className="h-5 w-5" />
            </Button>
          ) : (
            <MembershipButton status={isMember} group={group} user={user} />
          )}
        </CardContent>
      </Card>

      <Tabs className="-mt-[2px]" defaultValue="Posts">
        <TabsList className="grid w-full grid-cols-5 -space-x-1.5 rounded-b-lg rounded-t-none border bg-white text-center text-black shadow-sm">
          <TabsTrigger value="About" className="text-center hover:bg-gray-100">
            About
          </TabsTrigger>
          <TabsTrigger value="Posts" className="text-center hover:bg-gray-100">
            Posts
          </TabsTrigger>
          <TabsTrigger
            value="Members"
            className="text-center hover:bg-gray-100"
          >
            Members
          </TabsTrigger>
          <TabsTrigger value="Rooms" className="text-center hover:bg-gray-100">
            Rooms
          </TabsTrigger>
          {group.creatorId === user?.id ? (
            <TabsTrigger value="Ban" className="text-center hover:bg-gray-100">
              Ban List
            </TabsTrigger>
          ) : null}
        </TabsList>

        <TabsContent value="About">
          <AboutGroupTab
            description={group.description || "No description available"}
            creator={group.Creator}
            createdAt={group.createdAt}
            members={members.length}
            friendCount={friendCount}
          />
        </TabsContent>
        <TabsContent value="Posts">
          <CreatePost />
          <PostFeed initPosts={group.posts} groupName={group.name} />
        </TabsContent>
        <TabsContent value="Members">
          <MembersList members={members} group={group} currUser={user} />
        </TabsContent>
        <TabsContent value="Rooms">
          <VideoCall user={user} />
        </TabsContent>
        <TabsContent value="Ban">
          <MembersList members={bannedUsersList} group={group} currUser={user} forBan />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
