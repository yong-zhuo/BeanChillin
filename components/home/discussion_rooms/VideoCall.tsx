"use client";
import { Group, Room, User } from "@prisma/client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Call,
  StreamVideo,
  StreamVideoClient,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";
import { Loader2, PhoneOff, Plus, Video } from "lucide-react";
import { getVideoToken } from "@/lib/videocall/action";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createVideoSchema,
  type CreateVideo,
} from "@/lib/schemas/createVideoSchema";
import FormInput from "@/components/common-ui/form/FormInput";
import { Input } from "@/components/common-ui/shadcn-ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/common-ui/shadcn-ui/dialog";
import { Button } from "@/components/common-ui/shadcn-ui/button";
import { set } from "date-fns";
import { usePathname } from "next/navigation";
import MeetingPage from "./MeetingPage";
import VideoProvider from "./VideoProvider";
import { Separator } from "@/components/common-ui/shadcn-ui/separator";
import RoomPreview from "./RoomPreview";
import { useToast } from "@/components/common-ui/shadcn-ui/toast/use-toast";
import { useRouter } from "next/navigation";
import { DetailedRoom } from "@/types/room";
import { Card, CardContent, CardHeader } from "@/components/common-ui/shadcn-ui/card";

interface VideoCallProps {
  user?: User | null;
  groupId: string;
  isMember: boolean;
  rooms?: DetailedRoom[];
}

export const VideoCall = (props: VideoCallProps) => {
  const [callId, setCallId] = useState<string>("");
  const handleCallId = useCallback((id: string) => {
    setCallId(id);
  }, []);

  return (
    <VideoProvider user={props.user}>
      <div className="order-first my-3 h-fit rounded-lg md:order-last shadow">
        <div className="rounded-lg bg-pri ">
          <h2 className="flex items-center gap-1.5 px-6 py-4 font-semibold text-sec flex-row">
            Create a new discussion room <Video className="h-5 w-5"/>
          </h2>
          <dl className="px-8py-2 -my-2 divide-y divide-pri bg-white leading-6">
            <DescriptionInput
              handleCallId={handleCallId}
              groupId={props.groupId}
              isMember={props.isMember}
              userId={props.user?.id as string}
            />
          </dl>
        </div>
      </div>
      <Separator className="mt-5 bg-pri" />
      {props.rooms?.length !== 0 ? (
        props.rooms?.map((room) => (
          <RoomPreview key={room.id} room={room} isMember={props.isMember} />
        ))
      ) : (
        <Card className="mt-3">
          <CardHeader><h1 className="font-semibold text-md sm:text-lg flex flex-row gap-1">No discussion rooms available </h1></CardHeader>
          <CardContent><h2 className="font-medium text-sm sm:text-md">There are no new discussions rooms right now. <br/><br/>Check back later or create one now.</h2></CardContent>
        </Card>
      )}
    </VideoProvider>
  );
};

interface DescriptionInputProps {
  handleCallId: (value: string) => void;
  groupId: string;
  isMember: boolean;
  userId: string;
}

function DescriptionInput({
  handleCallId,
  groupId,
  isMember,
  userId,
}: DescriptionInputProps) {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [call, setCall] = useState<Call>();
  const client = useStreamVideoClient();
  const pathname = usePathname();
  const { toast } = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateVideo>({
    defaultValues: {
      title: "Video Call",
      description: "Join my video call!",
      members: 0,
    },
    resolver: zodResolver(createVideoSchema),
  });

  const onSubmit = async (data: CreateVideo) => {
    setIsLoading(true);
    if (!client) return;

    try {
      const id = crypto.randomUUID();
      const call = client.call("default", id);

     
      await call.getOrCreate({
        data: {
          custom: {
            title: data.title,
            description: data.description,
            createdBy: userId,
          },
        },
      });
      setCall(call);
      handleCallId(id);
      const res = await fetch("/api/room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          creatorId: userId,
          groupId,
          callId: call.id,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to create room");
      }
      
      router.refresh();
      toast({
        title: "Room created successfully",
        description: "Your room has been created successfully",
        variant: "event",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to create room",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {isMember ? (
            <Button
              className="mb-2 mt-2 bg-pri text-sec shadow transition hover:scale-105 hover:bg-slate-500 hover:shadow-lg"
              onChange={() => setOpen(true)}
            >
              New Room <Plus className="h-5 w-5" />
            </Button>
          ) : (
            <Button
              className="mb-2 mt-2 bg-pri text-sec shadow transition hover:scale-105 hover:bg-slate-500 hover:shadow-lg"
              onChange={() => setOpen(true)}
              disabled
            >
              Join the Group to create a Room
            </Button>
          )}
        </DialogTrigger>
        <DialogContent
          className="max-h-[90vh] w-[300px] overflow-y-auto sm:w-[800px] sm:max-w-[425px] "
          onInteractOutside={(e) => {
            if (isLoading) e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle>Create your Room</DialogTitle>
            <DialogDescription>
              Please fill in all fields. Click create to create your new
              discussion room.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <label
              htmlFor="title"
              className="text-md text-black-700 mb-1 block font-bold sm:text-base md:text-sm"
            >
              Title <span className="text-pri">*</span>
            </label>
            <Input
              type="text"
              data-testid={"title"}
              {...(register && register("title"))}
              className="border-gray-500 focus-visible:border-pri focus-visible:ring-transparent "
            />

            <label
              htmlFor="description"
              className="text-md text-black-700 mb-1 mt-4 block font-bold sm:text-base md:text-sm"
            >
              Room Description <span className="text-pri">*</span>
            </label>
            <Input
              type="text"
              data-testid={"description"}
              {...(register && register("description"))}
              className="border-gray-500 focus-visible:border-pri focus-visible:ring-transparent "
            />

            {/**<label
              htmlFor="members"
              className="text-md text-black-700 mb-1 mt-4 block font-bold sm:text-base md:text-sm"
            >
              Max number of users <span className="text-pri">*</span>
            </label>
            <Input
              type="number"
              className="border-gray-500 focus-visible:border-pri focus-visible:ring-transparent "
              data-testid={"members"}
              {...(register && register("members"))}
            />*/}
            <div className="flex w-full flex-col items-center">
              {isMember ? (
                <Button
                  className="mt-4 transform bg-pri text-sec shadow transition hover:scale-105 hover:bg-slate-500"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <p className="flex flex-row items-center">
                      Creating <Loader2 className="h-4 w-4 animate-spin" />
                    </p>
                  ) : (
                    <p>Create Room</p>
                  )}
                </Button>
              ) : (
                <Button
                  className="mt-4 transform bg-pri text-sec shadow transition hover:scale-105 hover:bg-slate-500"
                  disabled
                >
                  Join the Group to create a Room
                </Button>
              )}
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
