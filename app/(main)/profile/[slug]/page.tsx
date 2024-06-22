"use server"
import UserAvatar from "@/components/common-ui/misc/UserAvatar";
import { Card, CardContent } from "@/components/common-ui/shadcn-ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/common-ui/shadcn-ui/tabline";
import UserFeed from "@/components/home/feed/UserFeed";
import FriendRequestButton from "@/components/home/friends/FriendRequestButton";
import SettingsButton from "@/components/home/friends/SettingsButton";
import ViewGroupTabs from "@/components/home/group/ViewGroupTabs";
import { AboutProfileTab } from "@/components/home/profile/AboutProfileTab";
import prisma from "@/lib/prisma";
import { Oauth } from "@/lib/users/OAuth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

interface Props {
    params: {
        slug: string
    }
}

export default async function Page({ params }: Props) {

    async function getUserInfo(key: string) {

        const res = await prisma.user.findFirst({
            where: {
                OR: [{ id: key }, { email: key }]
            },
        });

        if (!res) {
            notFound();
        }

        return res;
    }

    async function getStatus(receiver_id: string,) {

        const sender_id = await prisma.user.findFirst({
            where: {
                email: session?.user?.email!
            },
            select: {
                id: true
            }
        });

        const status = await prisma.friendship.findFirst({
            where: {
                receiver_id: receiver_id,
                sender_id: sender_id?.id
            },
            select: {
                status: true
            }
        });

        const status1 = await prisma.friendship.findFirst({
            where: {
                receiver_id: sender_id?.id,
                sender_id: receiver_id,
            },
            select: {
                status: true
            }
        });

        const Nfriends = await prisma.friendship.count({
            where: {
                sender_id: receiver_id,
                status: 'Friend'
            },
        });
        return { sender_status: status?.status, receiver_status: status1?.status, Nfriends: Nfriends };
    }
    async function getStats(id: string) {
        const Ngroups = await prisma.membership.count({
            where: {
                userId: id
            }
        })

        const Nposts = await prisma.post.count({
            where: {
                authorId: id
            }
        })

        const Ncomments = await prisma.comment.count({
            where: {
                authorId: id
            }
        })

        return { Nposts: Nposts, Ncomments: Ncomments, Ngroups }
    }

    async function getGroups(id: string) {
        const [memberships, createdGroups] = await Promise.all([
            prisma.membership.findMany({
              where: {
                userId: id,
              },
              include: {
                group: true,
              },
            }), prisma.group.findMany({
              where: {
                creatorId: id,
              },
            })]);
      
      
          const joinedGroups = memberships.map((membership) => membership.group);

          return [joinedGroups, createdGroups];
        }

    const { slug } = params;
    const session = await getServerSession(Oauth);
    const info = await Promise.all([getUserInfo(slug), getStatus(slug), getStats(slug), getGroups(slug)]);
    
    const [userInfo, status_obj, stats, groups] = info;

    //get user details
    return (
        <div>
            <Card className="flex flex-col relative rounded-b-none border-b-2 border-b-pri">
                <div className="flex flex-col justify-center items-center mt-6 translate-y-5">
                    <UserAvatar
                        user={{ name: userInfo.name || null, imageUrl: userInfo.imageUrl || null }}
                        className='h-20 w-20 aspect-square border-2 border-pri rounded-full'
                    />
                    <CardContent className="flex items-center justify-between pt-4">
                        <h1 className="text-2xl font-semibold">{userInfo.name}
                        </h1>
                    </CardContent>
                </div>
                <div className='flex justify-end items-end mr-2 mb-2 z-10'>
                    {session?.user.email === userInfo.email ? <SettingsButton/> : <FriendRequestButton
                        sender_status={status_obj.sender_status || ""}
                        receiver_status={status_obj.receiver_status || ""}
                        receiver_id={userInfo.id}
                    />}
                </div>
            </Card>

            <Tabs className="-mt-[2px]" defaultValue="Posts">
                <TabsList className="grid w-full grid-cols-5 -space-x-1.5 rounded-b-lg rounded-t-none border bg-white text-center text-black shadow-sm">
                    <TabsTrigger value="About" className="text-center hover:bg-gray-100">
                        About
                    </TabsTrigger>
                    <TabsTrigger value="Posts" className="text-center hover:bg-gray-100">
                        Posts
                    </TabsTrigger>
                    <TabsTrigger value="Groups" className="text-center hover:bg-gray-100">
                        Groups
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="About">
                    <AboutProfileTab
                        description={userInfo.bio}
                        Nfriends={status_obj.Nfriends}
                        Ngroups={stats.Ngroups}
                        Nposts={stats.Nposts}
                        Ncomments={stats.Ncomments}
                    />
                </TabsContent>
                <TabsContent value="Posts">
                    <UserFeed
                        authorId={slug}
                    />
                </TabsContent>
                <TabsContent value="Groups">
                    <ViewGroupTabs joinedGroups={groups[0]} createdGroups={groups[1]}/>
                </TabsContent>
            </Tabs>
        </div>)

}