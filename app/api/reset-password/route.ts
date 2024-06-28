import prisma from "@/lib/prisma";
import { hash } from "bcrypt";

export async function POST(req: Request) {
    const data = await req.json();
    const password = data.password;
    if (!data.password || !data.userId) {
        throw new Error("Invalid request");
    }

    const encryptedPassword = await hash(password, 12);

    await prisma.user.update({
        where: {
            id: data.userId
        },
        data: {
            password: encryptedPassword
        }
    });

    return new Response("Password reset successful", { status: 200 });
}