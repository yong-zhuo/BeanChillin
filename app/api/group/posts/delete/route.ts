import prisma from "@/lib/prisma";
import { Oauth } from "@/lib/users/OAuth";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(Oauth);

        if (!session?.user) {
            return new Response("Unauthorized", { status: 401 });
        }

        const data = await req.json();

        //check if post exists
        const postExists = await prisma.post.findFirst({
            where: {
                id: data.postId,
            },
        });

        await fetch('https://beanchillin-ml.onrender.com/update_posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!postExists) {
            return new Response("Post does not exists", { status: 409 });
        }

        //delete post
        await prisma.post.delete({
            where: {
                id: data.postId,
            },
        });

        return new Response("Post deleted successfully", { status: 200 });

    } catch (e) {
        return new Response("Could not delete post", { status: 500 });
    }
}