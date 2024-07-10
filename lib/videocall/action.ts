"use server"

import { Oauth } from "../users/OAuth";
import { getServerSession } from "next-auth";
import { StreamClient } from "@stream-io/node-sdk"
import prisma from "../prisma";

export async function getVideoToken() {
    const streamApiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
    const streamApiSecret = process.env.STREAM_VIDEO_API_SECRET;

    if (!streamApiKey || !streamApiSecret) {
        throw new Error("Missing Stream API Key or Secret");
    }

    const session = await getServerSession(Oauth);

    if (!session?.user) {
        throw new Error("User not authenticated");
    }

    const streamClient = new StreamClient(streamApiKey, streamApiSecret);

    const expTime = Math.floor(Date.now() / 1000) + 3600;

    const createdAt = Math.floor(Date.now() / 1000) - 60;

    const token = streamClient.createToken(session.user.id, expTime, createdAt);

    return token;
}


export async function deleteRoom(roomId: string) {

    try {
        await prisma.room.delete({
            where: {
                id: roomId
            }
        });

        return new Response("Room deleted successfully", { status: 200 });
    } catch {
        throw new Error("Failed to delete room");
    }
}