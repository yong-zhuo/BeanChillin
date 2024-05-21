"use server"
import { prisma } from "@/constants/prisma";
import bcrypt from 'bcrypt';

export async function LoginUser(credentials: FormData): Promise<boolean> {
    const email = credentials.get('email') as string;
    const password = credentials.get('password') as string;
    const isAuth = await userAuthentication(email, password);
    console.log(email);
    console.log(password);
    if (!isAuth) {
        return false;
    }
    return true;
}

export async function userAuthentication(email: string, password: string) {

    if (email === null || password === null || password === "" || email === "") {
        return false;
    }

    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (user !== null) {
        const decodePass = await bcrypt.compare(password, user.password);
        return decodePass && (user.email === email);
    }
    return false;
}

