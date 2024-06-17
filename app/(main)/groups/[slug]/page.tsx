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

  //find membership status of user
  const membership = await prisma.membership.findFirst({
    where: {
      group: {
        name: slug,
      },
      user: {
        email: session?.user?.email,
      },
    },
  });

  const isMember = !!membership;

  const memberCount = await prisma.membership.count({
    where: {
      group: {
        name: slug,
      },
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
            />
          </AspectRatio>
          <GroupAvatar
            group
            img={group.picture || "/placeholder/pl3.png"}
            className="absolute bottom-0 aspect-square h-14 w-14 -translate-y-20 translate-x-1/3 transform rounded-lg border-2 border-pri lg:h-20 lg:w-20 lg:-translate-y-3/4 lg:translate-x-1/3"
          />
        </div>
        <CardContent className="-ml-1 flex items-center justify-between pt-8 md:ml-4">
          <h1 className="text-2xl font-semibold">
            {group.name} <GroupBadge type={group.type as GroupType} />
          </h1>
          <MembershipButton status={isMember} group={group} />
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
        </TabsList>

        <TabsContent value="About">
          <AboutGroupTab
            description={group.description || "No description available"}
            creator={group.Creator}
            createdAt={group.createdAt}
            members={memberCount}
          />
        </TabsContent>
        <TabsContent value="Posts">
          <CreatePost session={session} />
          <PostFeed initPosts={group.posts} groupName={group.name} groupCreatorId={group.creatorId as string} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
