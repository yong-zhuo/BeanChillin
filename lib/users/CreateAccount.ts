'use server'
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import bcrypt from 'bcrypt';
import { signup } from "../schemas/signupSchema";

export default async function CreateAccount(data: signup) {
    const email = data.email;
    const password = data.password;

    try {
        const hashedPass = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name: "",
                email,
                password: hashedPass,
                signinType: true,
                isOnboard: false
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
