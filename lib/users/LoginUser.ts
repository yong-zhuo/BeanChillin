"use server"
import { prisma } from "@/lib/prisma";
import bcrypt from 'bcrypt';
import { type login } from "../schemas/loginSchema";

export async function LoginUser(credentials: login): Promise<boolean> {
    const isAuth = await userAuthentication(credentials.email, credentials.password);
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

