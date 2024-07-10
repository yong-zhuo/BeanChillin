import prisma from "@/lib/prisma";

export async function POST(req: Request) {

    const data = await req.json();

    try {
        await prisma.room.create({
            data: {
                title: data.title,
                description: data.description,
                groupId: data.groupId,
                creatorId: data.creatorId,
                id: data.callId,
            }
        });

        return new Response("Room created successfully", { status: 200 });
    } catch {
        throw new Error("Failed to create room");
    }
}

