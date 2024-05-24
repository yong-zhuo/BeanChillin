import { Oauth } from "@/lib/users/OAuth";
import NextAuth from "next-auth/next";

const handler = NextAuth(Oauth);

export { handler as GET, handler as POST };
