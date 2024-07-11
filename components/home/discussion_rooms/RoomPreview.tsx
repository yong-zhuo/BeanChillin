"use client";
import UserAvatar from "@/components/common-ui/misc/UserAvatar";
import { Button } from "@/components/common-ui/shadcn-ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/common-ui/shadcn-ui/card";
import { Separator } from "@/components/common-ui/shadcn-ui/separator";
import { formatTimeToNow } from "@/lib/utils";
import { DetailedRoom } from "@/types/room";
import { Room, User } from "@prisma/client";
import { PhoneForwarded } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React from "react";

interface RoomPreviewProps {
  room: DetailedRoom;
  isMember: boolean;
}

const RoomPreview = ({ room, isMember}: RoomPreviewProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <Card className="mb-3 mt-3">
      <CardHeader suppressHydrationWarning>
        <div className="flex flex-row">
          <h1 className="text-md font-semibold sm:text-xl">{room.title}</h1>
          <span className="sm:text-md px-1 ">•</span>
          <div className="flex flex-row  gap-1 text-sm font-medium sm:text-lg ">
            <UserAvatar
              user={{
                name: room.creator.name || null,
                imageUrl: room.creator.imageUrl || null,
              }}
              className="aspect-square h-7 w-7 rounded-full border-2 border-pri"
            />
            <Link
              href={`/profile/${room.creatorId}`}
              className="hover:text-pri hover:underline"
            >
              {room.creator.name}
            </Link>
          </div>
        </div>
        <h2 className="font-light">
          {formatTimeToNow(new Date(room.createdAt))}
        </h2>
        <Separator className="bg-pri" />
      </CardHeader>

      <CardContent className="-mt-2 flex flex-row items-center justify-between">
        <p className="text-sm sm:text-lg truncate ">{room.description}</p>
        {isMember ? <Button
          className="w-fit bg-pri text-white transition hover:scale-105 hover:bg-slate-500 gap-1"
          onClick={async () => router.push(`/rooms/${room.groupId}/${room.id}`)}
          disabled={isLoading}
        >
          Join Room <PhoneForwarded className="h-4 w-4"/>
        </Button> : <Button className="text-sm bg-pri text-white w-fit" disabled>Only group Members can Join</Button>}
      </CardContent>
    </Card>
  );
};

export default RoomPreview;
