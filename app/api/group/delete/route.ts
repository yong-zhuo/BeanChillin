import prisma from "@/lib/prisma";
import { Oauth } from "@/lib/users/OAuth";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(Oauth);

        if (!session?.user) {
            return new Response("Unauthorized", { status: 401 });
        }

        const data = await req.json();

        //check if group exists
        const groupExists = await prisma.group.findFirst({
            where: {
                name: data.name,
                
            },
        });

    
        if (groupExists){
            return new Response("Group already exists", { status: 409});
        }

        //delete group
        await prisma.group.delete({
            where: {
                name: data.name,
            },
        });

    
    } catch (e) {
        return new Response("Could not delete group", { status: 500 });
    }
}