import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import SessionWrapper from "@/components/user-auth/login/SessionWrapper";
import { Toaster } from "@/components/common-ui/shadcn-ui/toast/toaster";
import NextTopLoader from "nextjs-toploader";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BeanChillin",
  description: "Time to Chill",
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    
      <SessionWrapper>
        <html lang="en">
          <body className={inter.className}>
            <NextTopLoader
              color="#8fc5da"
              initialPosition={0.08}
              crawlSpeed={200}
              height={4}
              crawl={true}
              showSpinner={true}
              easing="ease"
              speed={200}
            />
            <main>{children}</main>
            <Toaster />
          </body>
        </html>
      </SessionWrapper>
    
  );
}
