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

export async function DELETE(req: Request) {
    try {
        const url = new URL(req.url);

        const commentId = url.searchParams.get('comment') as string;
        const replyToId = url.searchParams.get('replyToId') as string;
    

        const session = await getServerSession(Oauth);

        if(!session?.user) {
            return new Response('Unauthorized', {status: 401});
        }

        if(replyToId === null) {
            await prisma.comment.delete({
                where: {
                    id: commentId,
                    
                }
            });

            return new Response('Comment deleted', {status: 200});
        }
        
        await prisma.comment.delete({
            where: {
                id: commentId,
                replyToId: replyToId
                
                
            }
        });

        return new Response('Comment deleted', {status: 200});
        
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(error.message, {status: 400});
        }

        return new Response('Failed to delete comment', {status: 500})
    }
}