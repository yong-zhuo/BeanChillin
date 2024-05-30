import { getServerSession } from "next-auth";
import { Oauth } from "../users/OAuth";


export default async function getsession() {
    return await getServerSession(Oauth);
}