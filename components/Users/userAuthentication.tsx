import { PrismaClient } from '@prisma/client';

interface IProps {
    email: string;
    password: string;
}

export default function userAuthentication(params: IProps) : Promise<boolean> {
    const { email, password } = params;
    return validateUser(email, password)
}

async function validateUser(email: string, password: string) {
    const prisma = new PrismaClient();
    
    if (email === null || password === null || password === "" || email === "") {
        return false;
    }
    
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }});
    return user !== null && (user.password === password) && (user.email === email);
}

