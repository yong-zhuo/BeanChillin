import { PrismaClient } from '@prisma/client';

export default async function createUser(email: string, password: string) {
    const prisma = new PrismaClient();
    const user = await prisma.user.create({ data: {
            name: "",
            email,
            password,
        }}).then((res) => {
            return(res.email + " has been created");
        }).catch((err) => {
            prisma.user.findMany().then((res) => {for(let i = 0; i < res.length; i++) {
                console.log(res[i]);
            }});
        });
}