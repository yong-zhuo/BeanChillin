'use server'
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import bcrypt from 'bcrypt';

export default async function CreateAccount(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirm-password') as string;
    const msg = RegisterAuth(email, password, confirmPassword);
    if (msg !== 'ok') return msg;

    try {
        const hashedPass = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name: "",
                email,
                password: hashedPass,
                signinType: true
            }
        })
        return 'ok';
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') {
                return 'Email already exist!';
            }
        }
        return 'Error has occured when creating an account! Please try again!';
    }
}

function RegisterAuth(email: string, password: string, confirmPassword: string): string {
    let msg = '';
    if (!email.endsWith('@gmail.com')) {
        msg = 'Invalid email! email should ends with @gmail.com';
    } else if (password !== confirmPassword) {
        msg = 'Password does not match!';
    } else if (password.length < 8) {
        msg = 'Password is too short! Password should be of length minimum 8';
    } else {
        msg = 'ok';
    }
    return msg;
}
