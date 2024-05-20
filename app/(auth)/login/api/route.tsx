import userAuthentication from "@/components/users/UserAuthentication";

export async function GET() {
    try {
        await userAuthentication("admin1@gmail.com", "12345")
            .then((res) => { if (res === false) throw new Error() });
        return new Response("ok");
    } catch (e) {
        return new Response("nuh-uh");
    }
}

