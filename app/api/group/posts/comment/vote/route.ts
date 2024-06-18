import prisma from "@/lib/prisma"
import { commentVoteSchema} from "@/lib/schemas/voteSchema"
import { Oauth } from "@/lib/users/OAuth"
import { getServerSession } from "next-auth"
import { z } from "zod"

export async function PATCH(req: Request) {
    try {
        const data = await req.json()
        const { commentId, voteType } = commentVoteSchema.parse(data)

        const session = await getServerSession(Oauth)

        if (!session?.user) {
            return new Response("Unauthorized", { status: 401 })
        }

        //check if user has already voted
        const voteExist = await prisma.commentVote.findFirst({
            where: {
                userId: data.userId,
                commentId: commentId,
            },
        })


        //if user has already voted
        if (voteExist) {
            //if user has voted the same type
            if (voteExist.type === voteType) {
                await prisma.commentVote.delete({
                    where: {
                        userId_commentId: {
                            commentId: commentId,
                            userId: data.userId,
                        }
                    },
                })
                return new Response('OK')
            }

            //if user has voted different type
            await prisma.commentVote.update({
                where: {
                    userId_commentId: {
                        commentId: commentId,
                        userId: data.userId,
                    }
                },
                data: {
                    type: voteType,
                }
            })

            

            return new Response('OK', { status: 200 })
        }


        //create new vote if no existing vote
        await prisma.commentVote.create({
            data: {
                type: voteType,
                commentId: commentId,
                userId: data.userId,
            },
        })

        return new Response('OK', { status: 200 })

        

    } catch (error) {

        if (error instanceof z.ZodError) {
            return new Response(error.message, { status: 400 })
        }

        return new Response(
            'Could not post to group at this time. Please try later',
            { status: 500 }
        )
    }
}