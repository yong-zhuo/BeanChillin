"use client";

import { getVideoToken } from "@/lib/videocall/action";
import { User } from "@prisma/client";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { Loader2 } from "lucide-react";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

interface VideoProviderProps {
  children: React.ReactNode;
  user?: User | null;
}

export default function VideoProvider({ children, user }: VideoProviderProps) {
   
  const videoClient = useIntializeVideoClient(user!);
  if (!videoClient) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="mx-auto animate-spin" />
      </div>
    );
  }

  return <StreamVideo client={videoClient}>{children}</StreamVideo>
}

function useIntializeVideoClient(user: User | null) {
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(
    null,
  );

  useEffect(() => {
    if (user === null) return;

    const image = user?.imageUrl
      ? user?.imageUrl
      : "public/profile/avatar.svg";
    let streamUser;
    if (user) {
      streamUser = {
        id: user?.id!,
        name: user?.name!,
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
      tokenProvider: user ? getVideoToken : undefined,
    });
    setVideoClient(client);

    return () => {
      client.disconnectUser();
      setVideoClient(null);
    };
  }, [user]);
  return videoClient;
}
