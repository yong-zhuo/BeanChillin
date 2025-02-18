import prisma from "@/lib/prisma";
import { createPostSchema } from "@/lib/schemas/createPostSchema";
import { Oauth } from "@/lib/users/OAuth";
import { getServerSession } from "next-auth";
import { z } from "zod";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(Oauth);

        const data = await req.json();
        console.log(data);
        const { title, groupId, content } = createPostSchema.parse(data);

        if (!session?.user) {
            return new Response("Unauthorized", { status: 401 });
        }

        //check if user is a member of the group
        const membership = await prisma.membership.findFirst({
            where: {
                groupId: groupId,
                userId: data.userId,
            },
        });

        if (!membership) {
            return new Response("Please join the group to post", { status: 403 });
        }

        await prisma.post.create({
            data: {
                title,
                content,
                authorId: data.userId,
                groupId
            },
        });

        //Disable due to faulty Render API
        /** 
        await fetch('https://beanchillin-ml.onrender.com/update_posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        */

        return new Response('OK')


    } catch (error) {
        console.log(error);
        if (error instanceof z.ZodError) {
            return new Response(error.message, { status: 400 });
        }

        return new Response(
            'An unexpected error occurred. Try again later.',
            { status: 500 }
        )
    }
}