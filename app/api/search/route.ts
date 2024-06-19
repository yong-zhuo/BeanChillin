import prisma from "@/lib/prisma"

export async function GET(req: Request) {
    console.log("hulo")
    const url = new URL(req.url)
    const p = url.searchParams.get("p")

    if(!p) {
        return new Response('Invalid query', { status: 400 })
    }

    const [groups,users] = await Promise.all([prisma.group.findMany({
        where: {
            name: {
                startsWith: p,
                mode: 'insensitive'
            }
        },
        include: {
            _count: true
        },
        take: 5
    }), prisma.user.findMany({
        where: {
            name: {
                startsWith: p,
                mode: 'insensitive'
            }
        },
        include: {
            _count: true
        },
        take: 5
    })])

    return new Response(JSON.stringify([groups,users]))
}