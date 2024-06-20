"use client";
import { Card, CardContent } from "@/components/common-ui/shadcn-ui/card";
import { Separator } from "@radix-ui/react-dropdown-menu";



type AboutProps = {
    description: string | null;
    Ngroups: number;
    Ncomments: number;
    Nposts: number;
    Nfriends: number;
};


export function AboutProfileTab(props: AboutProps) {

    return (
        <Card className="">
            <CardContent className="md:ml-4 md:mr-4">
                <h1 className="mt-4 text-2xl font-semibold">Description</h1>
                <Separator className="bg-pri bg-opacity-30" />
                <p className="text-lg text-gray-400">{props.description}</p>
                <h1 className="mt-4 text-2xl font-semibold">Groups Joined</h1>
                <Separator className="bg-pri bg-opacity-30" />
                <p className="text-lg text-gray-400">{props.Ngroups} Groups</p>
                <h1 className="mt-4 text-2xl font-semibold">Total Friends</h1>
                <Separator className="bg-pri bg-opacity-30" />
                <p className="text-lg text-gray-400">{props.Nfriends} friends</p>
                <h1 className="mt-4 text-2xl font-semibold">Total Posts</h1>
                <Separator className="bg-pri bg-opacity-30" />
                <p className="text-lg text-gray-400">{props.Nposts} posts</p>
                <h1 className="mt-4 text-2xl font-semibold">Total Comments</h1>
                <Separator className="bg-pri bg-opacity-30" />
                <p className="text-lg text-gray-400">{props.Ncomments} comments</p>
            </CardContent>
        </Card>
    );

}

