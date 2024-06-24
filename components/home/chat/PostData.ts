"use server"
import prisma from "@/lib/prisma"
import { Oauth } from "@/lib/users/OAuth"
import { getServerSession } from "next-auth";

export async function postData(formData: FormData) {
    //create message
    const Pusher = require('pusher');
    const session = await getServerSession(Oauth);
    const message = formData.get("message");
    const sender_id = formData.get("sender_id");
    const receiver_id = formData.get("receiver_id");
    const key = formData.get("key");

    if (typeof message === 'string' && message.trim().length !== 0) {
        const data = await prisma.message.create({
            data: {
                message: message as string,
                email: session?.user?.email!,
                sender_id: sender_id as string,
                receiver_id: receiver_id as string
            },
            include: {
                user: {
                    select: {
                        name: true
                    }
                }
            }
        })

        const pusher = new Pusher({
            appId: process.env.PUSHER_APP_ID,
            key: process.env.NEXT_PUBLIC_PUSHER_KEY,
            secret: process.env.PUSHER_SECRET,
            cluster: "ap1",
            useTLS: true,
        });

        await pusher.trigger(key, "my-event", {
            message: `${JSON.stringify(data)}\n\n`,
        });
    }
}

