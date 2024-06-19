"use client";
import { Card, CardContent } from "@/components/common-ui/shadcn-ui/card";
import { User } from "@prisma/client";
import { Separator } from "@radix-ui/react-dropdown-menu";
import user from "pusher-js/types/src/core/user";


type AboutProps = {
    description: string | null;
    creator: User | null;
    createdAt: Date;
    members: number;
};


export function AboutProfileTab(props: AboutProps) {

    return (
        <Card className="">
            <CardContent className="md:ml-4 md:mr-4">
                <h1 className="mt-4 text-2xl font-semibold">Description</h1>
                <Separator className="bg-pri bg-opacity-30" />
                <p className="text-lg text-gray-400">{props.description}</p>
                <h1 className="mt-4 text-2xl font-semibold">Members</h1>
                <Separator className="bg-pri bg-opacity-30" />
                <p className="text-lg text-gray-400">{props.members} Members</p>
            </CardContent>
        </Card>
    );

}

