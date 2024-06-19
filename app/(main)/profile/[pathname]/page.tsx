"use server"
import { Card, CardContent } from "@/components/common-ui/shadcn-ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/common-ui/shadcn-ui/tabs";
import MembershipButton from "@/components/home/group/MembershipButton";
import { AboutProfileTab } from "@/components/home/profile/AboutProfileTab";
import { get } from "http";
import Image from "next/image"; // Import the Image component from the correct module

interface Props {
    params: {
        pathname: string
    }
}

export default async function Page({ params }: Props) {

    const { pathname } = params;
    //get user details
    return (
        <div>
            <Card className="relative rounded-b-none  border-b-2 border-b-pri">
                <div className="mx-auto mt-6 w-11/12">
                    <h1>{pathname}</h1>
                </div>
                <CardContent className="-ml-1 flex items-center justify-between pt-8 md:ml-4">
                    <h1 className="text-2xl font-semibold">Group Name
                    </h1>
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