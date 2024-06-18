import prisma from "@/lib/prisma";
import { commentSchema } from "@/lib/schemas/commentSchema";
import { Oauth } from "@/lib/users/OAuth";
import { getServerSession } from "next-auth";
import { z } from "zod";

export async function PATCH(req: Request) {
    try {
        const data = await req.json();

        const {postId, content, replyToId} = commentSchema.parse(data);

        const session = await getServerSession(Oauth);

        if(!session?.user) {
            return new Response('Unauthorized', {status: 401});
        }

        await prisma.comment.create({
            data: {
                content,
                postId,
                authorId: data.userId,
                replyToId
            }
        });

        return new Response('Comment posted', {status: 200});
        
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(error.message, {status: 400});
        }

        return new Response('Failed to post comment', {status: 500})
    }
}