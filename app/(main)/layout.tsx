import { UserProvider } from "@/components/home/UserContext";
import NavBar from "@/components/home/navbar/NavBar";
import LeftSideBar from "@/components/home/sidebar-left/LeftSideBar";
import RightSideBar from "@/components/home/sidebar-right/RightSideBar";
import prisma from "@/lib/prisma";
import { Oauth } from "@/lib/users/OAuth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Home | BeanChillin",
  description: "Welcome to BeanChillin!",
};

interface HomeLayoutProps {
  children: React.ReactNode;
}

const layout = async ({ children }: HomeLayoutProps) => {

  const session = await getServerSession(Oauth)
  if (!session) {
    redirect("/login")
  }
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email as string,
    },
  });

  return (
    <UserProvider>
      <div className="flex h-screen flex-col bg-[url('/patterns/pattern-light.png')] overflow-auto">
        <NavBar user={user}/>
        <div className="container max-w-8xl mx-auto h-full pt-14 mt-5">
          <section className="max-w-8xl mx-auto flex h-full w-full ">
              <LeftSideBar />
            <div className="h-full w-full p-3">{children}</div>
            <RightSideBar />
          </section>
        </div>
      </div>
    </UserProvider>
  );
};

export default layout;
