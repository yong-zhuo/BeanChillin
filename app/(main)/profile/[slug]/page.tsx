"use server"
import UserAvatar from "@/components/common-ui/misc/UserAvatar";
import { Card, CardContent } from "@/components/common-ui/shadcn-ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/common-ui/shadcn-ui/tabline";
import FriendRequestButton from "@/components/home/friends/FriendRequestButton";
import MembershipButton from "@/components/home/group/MembershipButton";
import { AboutProfileTab } from "@/components/home/profile/AboutProfileTab";
import prisma from "@/lib/prisma";
import { Oauth } from "@/lib/users/OAuth";
import { get } from "http";
import { getServerSession } from "next-auth";
import Image from "next/image"; // Import the Image component from the correct module
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

    async function getStatus(receiver_id: string) {

        const id = await prisma.user.findFirst({
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
                sender_id: id?.id
            },
            select: {
                status: true
            }
        });

        const status1 = await prisma.friendship.findFirst({
            where: {
                receiver_id: id?.id,
                sender_id: receiver_id,
            },
            select: {
                status: true
            }
        });

        console.log(status, status1)
        return { sender_status: status?.status, receiver_status: status1?.status };
    }

    const { slug } = params;
    const session = await getServerSession(Oauth);
    const info = await Promise.all([getUserInfo(slug), getStatus(slug)]);
    const [userInfo, status_obj] = info;

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
                <div className='flex justify-end items-end mr-2 mb-2'>
                    <FriendRequestButton
                        sender_status={status_obj.sender_status || ""}
                        receiver_status={status_obj.receiver_status || ""}
                        receiver_id={userInfo.id}
                    />
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
                </TabsList>

                <TabsContent value="About">
                    <AboutProfileTab
                        description="This is a description"
                        creator={null}
                        members={5}
                        createdAt={new Date()}
                    />
                </TabsContent>
                <TabsContent value="Posts">


                </TabsContent>
            </Tabs>
        </div>)

}