"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Loading from "@/components/common-ui/misc/Loading";

export default function Root() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    } else {
      router.push("/home");
    }
  }, []);

  return <Loading />;
}
