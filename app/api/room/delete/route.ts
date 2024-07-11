import prisma from "@/lib/prisma";

export async function DELETE(req: Request) {
   
    try {
        const url = new URL(req.url);
        const callId = url.searchParams.get('callId') as string;
        await prisma.room.delete({
            where: {
                id: callId
            }
        });

        return new Response("Room deleted successfully", { status: 200 });
    } catch {
        throw new Error("Failed to delete room");
    }
}