import prisma from "@/lib/prisma";
import { Oauth } from "@/lib/users/OAuth";
import { getServerSession } from "next-auth";

export async function PATCH(req: Request) {
    try {
        const session = await getServerSession(Oauth);
        

        if (!session?.user) {
            return new Response("Unauthorized", { status: 401 });
        }

        const data = await req.json();
        

        //check if group exists
        const groupExists = await prisma.group.findFirst({
            where: {
                id: data.id,
            },
        })

        if (!groupExists){
            return new Response("Group does not exists", { status: 409});
        }

        //create group
        const group = await prisma.group.update({
            where: {
                id: data.id,
            },
            data: {
                name: data.name,
                description: data.description,
                type: data.type,
            }
        })

        if (typeof group.creatorId === 'undefined') {
            return new Response('Creator ID is undefined', { status: 400 });
        }

        
        return new Response(JSON.stringify(group.name));
    
    } catch (e) {
        console.log(e)
        return new Response('Could not update group', {status: 500})
    }
}