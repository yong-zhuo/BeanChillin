"use server"
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
export default async function userAuthentication(email: string, password: string): Promise<boolean> {
    return validateUser(email, password);
}

async function validateUser(email: string, password: string) {

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

