import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';

export default async function createUser(email: string, password: string) {
    const prisma = new PrismaClient();

    try {
        const hashedPass = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({ data: {
            name: "",
            email,
            password: hashedPass,
        }})
        return 201;
    } catch(err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                if (err.code === 'P2002') {
                    return 2002;
                }
            }
            return 1001;
        }
}