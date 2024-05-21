import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import SessionWrapper from "@/components/user-auth/login/SessionWrapper";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BeanChillin",
  description: "Time to Chill",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </SessionWrapper>
  );
}
