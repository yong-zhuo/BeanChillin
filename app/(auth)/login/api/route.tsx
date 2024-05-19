import userAuthentication from "@/components/Users/userAuthentication";

export async function GET() {
    try {
        await userAuthentication({email:"admin1@gmail.com", password:"12345"})
                .then((res) => {if (res === false) throw new Error()});
        return new Response("ok");
    } catch (e) {
        return new Response("nuh-uh");
    }
}

