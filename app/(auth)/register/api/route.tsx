import createUser from "@/components/Users/createUser";

export async function POST(request: Request) {
    const user = await createUser("admin1@gmail.com", "12345");
    return new Response(JSON.stringify(user), {headers: {"Content-Type": "application/json"}})
}