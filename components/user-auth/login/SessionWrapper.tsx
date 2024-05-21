"use client";
import { SessionProvider } from "next-auth/react"

type SessionProps = {
    children: React.ReactNode
}

const SessionWrapper = ({children}: SessionProps) => {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}

export default SessionWrapper