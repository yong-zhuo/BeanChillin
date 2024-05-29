'use server'

import { hash } from "bcrypt";
import prisma  from "../prisma";
import { reset } from "../schemas/resetSchema";
import { redirect } from "next/navigation";

export async function resetPassword(token:string, data:reset) {
    const password = data.password;

    const passwordResetToken = await prisma.passwordResetToken.findUnique({
        where: {
            token,
            createdAt: { gt: new Date(Date.now() - 1000 * 60 * 60 * 4) },
            resetAt: null
        },
    });


    if (!passwordResetToken) {
        throw new Error("Invalid or expired token. Please try resetting your password again.");
    }

    const encryptedPassword = await hash(password, 12);

    const updateUser = prisma.user.update({
        where: {
            id: passwordResetToken.userId
        },
        data: {
            password: encryptedPassword
        }
    });


    
    const updateToken = prisma.passwordResetToken.update({
        where: {
            id: passwordResetToken.id
        },
        data: {
            resetAt: new Date()
        },
    });

    try {
        // Update user password and token
        await prisma.$transaction([updateUser, updateToken]);

    } catch (e) {
        throw new Error("Failed to reset password")
    }

    redirect('/reset-password/success')
}