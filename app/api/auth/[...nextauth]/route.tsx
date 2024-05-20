
import { Oauth } from "@/components/Users/OAuth";
import NextAuth from "next-auth/next";

const handler = NextAuth(Oauth);

export { handler as GET, handler as POST };