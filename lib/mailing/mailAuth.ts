"use server"

import prisma from "../prisma";
import { forget } from "../schemas/forgetSchema";

export default async function mailAuth(data: forget) {
    const email = data.email

    //if email is undefined
    if (!email || typeof email !== 'string' || email === '') {
        throw new Error("Invalid email");
    }

    const user = await prisma.user.findUnique({
        where: { email },
    })

    if (!user) {
        throw new Error("User not found")
    }
}