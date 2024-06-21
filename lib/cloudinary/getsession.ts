import { getServerSession } from "next-auth";
import { Oauth } from "../users/OAuth";


export default async function getSession() {
    return await getServerSession(Oauth);
}