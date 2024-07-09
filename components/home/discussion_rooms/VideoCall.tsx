"use client"
import { Group, User } from "@prisma/client";
import React, { useCallback, useEffect, useState } from "react";
import { Call, StreamVideo, StreamVideoClient, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { Loader2 } from "lucide-react";
import { getVideoToken } from "@/lib/videocall/action";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createVideoSchema, type CreateVideo } from "@/lib/schemas/createVideoSchema";
import FormInput from "@/components/common-ui/form/FormInput";
import { Input } from "@/components/common-ui/shadcn-ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/common-ui/shadcn-ui/dialog";
import { Button } from "@/components/common-ui/shadcn-ui/button";
import { set } from "date-fns";
import { usePathname } from "next/navigation";
import MeetingPage from "./MeetingPage";

interface VideoCallProps {
    user?: User | null;
}

export const VideoCall = (props: VideoCallProps) => {

    function useIntializeVideoCall() {
        const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(null);

        useEffect(() => {
            if (props.user === null) return;

            const image = props.user?.imageUrl ? props.user?.imageUrl : "public/profile/avatar.svg";
            let streamUser;
            if (props.user) {
                streamUser = {
                    id: props?.user?.id!,
                    name: props?.user?.name!,
                    image: image,
                };
            }

            const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
            if (!apiKey) {
                throw new Error("Missing Stream API Key");
            }

            const client = new StreamVideoClient({
                apiKey: apiKey,
                user: streamUser,
                tokenProvider: props.user ? getVideoToken : undefined,
            });
            setVideoClient(client);

            return () => {
                client.disconnectUser();
                setVideoClient(null);
            };
        }, []);
        return videoClient;
    }

    const videoClient = useIntializeVideoCall();
    const [callId, setCallId] = useState<string>("");
    const handleCallId = useCallback((id: string) => { setCallId(id); }, []);
    if (!videoClient) {
        return <div className="h-screen flex items-center justify-center">
            <Loader2 className="mx-auto animate-spin" />
        </div>
    };
    return (
        <StreamVideo client={videoClient}>
            <div className="w-full mx-auto space-y-6 rounded-md bg-white p-5">
                <h2 className="text-xxl font-bold">Create a new meeting</h2>
                <DescriptionInput handleCallId={handleCallId} />
                <MeetingPage id={callId} />
            </div>
        </StreamVideo>
    );
}

interface DescriptionInputProps {
    handleCallId: (value: string) => void;
}

function DescriptionInput({ handleCallId }: DescriptionInputProps) {
    const [active, setActive] = useState(false);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [call, setCall] = useState<Call>();
    const client = useStreamVideoClient();
    const pathname = usePathname();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateVideo>({
        defaultValues: { title: "Video Call", description: "Join my video call!", members: 0 },
        resolver: zodResolver(createVideoSchema)
    });

    const onSubmit = async (data: CreateVideo) => {
        setIsLoading(true);
        if (!client) return;

        try {
            const id = crypto.randomUUID();
            const call = client.call("default", id);

            call.join({ create: true });
            await call.getOrCreate({
                data: {
                    custom: { description: data.description }
                }
            })
            setCall(call);
            handleCallId(id);
        } catch (error) {
            console.error(error);
            alert("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
            setOpen(false);
        }
    }

    return (
        <div className="space-y-2 flex flex-col items-center justify-center">
            <Dialog open={open} onOpenChange={setOpen} >
                <DialogTrigger asChild>
                    <Button
                        className="shadow bg-pri text-sec mt-2 mb-2 hover:bg-slate-500 hover:shadow-lg hover:scale-105 transition"
                        onChange={() => setOpen(true)}
                    >
                        New Room
                    </Button>
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
                            Please fill in all fields. Click create to create your new discussion room.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label
                            htmlFor="title"
                            className="text-md mb-1 text-black-700 block font-bold sm:text-base md:text-sm"
                        >
                            Title <span className="text-pri">*</span>
                        </label>
                        <Input
                            type="text"
                            data-testid={"title"}
                            {...(register && register("title"))}
                        />

                        <label
                            htmlFor="description"
                            className="text-md mt-4 mb-1 text-black-700 block font-bold sm:text-base md:text-sm"
                        >
                            Room Description <span className="text-pri">*</span>
                        </label>
                        <Input
                            type="text"
                            data-testid={"description"}
                            {...(register && register("description"))}
                        />

                        <label
                            htmlFor="members"
                            className="text-md mt-4 mb-1 text-black-700 block font-bold sm:text-base md:text-sm"
                        >
                            Max number of users <span className="text-pri">*</span>
                        </label>
                        <Input
                            type="number"
                            data-testid={"members"}
                            {...(register && register("members"))}
                        />
                        <div className="flex w-full flex-col items-center">
                            <Button
                                className="bg-pri text-sec transform hover:-translate-y-1 transition duration-400 hover:animate-pulse shadow mt-4"
                                type="submit"
                            >Create Room
                            </Button>
                        </div>

                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
