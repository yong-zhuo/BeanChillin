'use server'

import prisma from "../prisma";
import { randomUUID } from "crypto";
import { mailMessage, sendMail } from "./MailService";
import { forget } from "../schemas/forgetSchema";
import { redirect } from "next/navigation";

const DOMAIN = process.env.DOMAIN || 'localhost:3000';
const PROTOCOL = process.env.NODE_ENV === 'production' ? 'https' : 'http';

export async function sendReq(data: forget) {
    const email = data.email
    //CLEANUP: Dont need checks as there is mailAuth
    //if email is undefined
    if (!email || typeof email !== 'string') {
        throw new Error("Invalid email");
    }

    const user = await prisma.user.findUnique({
        where: { email },
    })

    if (!user) {
        throw new Error("User not found")
    }

    const token = await prisma.passwordResetToken.create({
        data: {
            userId: user.id,
            token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
        }
    })

    const messageData: mailMessage = {
        from: `beanchillin3@gmail.com`,
        to: email,
        subject: 'Reset Password Request',
        text: `Hello ${user.name}, someone (hopefully you) requested a password reset for this account. If you did want to reset your password, please click here: ${PROTOCOL}://${DOMAIN}/reset-password/${token.token}
    
    For security reasons, this link is only valid for four hours.
        
    If you did not request this reset, please ignore this email.`,
    }

    await sendMail(messageData);
    redirect('/forget-password/success');
}