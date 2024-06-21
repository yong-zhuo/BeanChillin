import prisma from "@/lib/prisma"
import { postVoteSchema } from "@/lib/schemas/voteSchema"
import { Oauth } from "@/lib/users/OAuth"
import { getServerSession } from "next-auth"
import { z } from "zod"

export async function PATCH(req: Request) {
    try {
        const data = await req.json()
        const { postId, voteType } = postVoteSchema.parse(data)

        const session = await getServerSession(Oauth)

        if (!session?.user) {
            return new Response("Unauthorized", { status: 401 })
        }

        //check if user has already voted
        const voteExist = await prisma.vote.findFirst({
            where: {
                userId: data.userId,
                postId: postId,
            },
        })

        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            },
            include: {
                author:true,
                votes: true,
            }
        })

        //if post does not exist
        if (!post) {
            return new Response("Post not found", { status: 404 })
        }

        //if user has already voted
        if (voteExist) {
            //if user has voted the same type
            if (voteExist.type === voteType) {
                await prisma.vote.delete({
                    where: {
                        userId_postId: {
                            postId: postId,
                            userId: data.userId,
                        }
                    },
                })
                return new Response('OK')
            }

            //if user has voted different type
            await prisma.vote.update({
                where: {
                    userId_postId: {
                        postId: postId,
                        userId: data.userId,
                    }
                },
                data: {
                    type: voteType,
                }
            })

            

            return new Response('OK', { status: 200 })
        }


        //create new vote
        await prisma.vote.create({
            data: {
                type: voteType,
                postId: postId,
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