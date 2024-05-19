"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Root() {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!loggedIn) {
      router.push('/login', undefined);
    } else {
      router.push('/home',undefined);
    }
  }, [])
}