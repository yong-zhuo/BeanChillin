import { UserProvider } from "@/components/home/UserContext";
import VideoProvider from "@/components/home/discussion_rooms/VideoProvider";
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
  const session = await getServerSession(Oauth);
  if (!session) {
    redirect("/login");
  }
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email as string,
    },
  });
  const notifCount = await prisma.notification.count({
    where: {
      userId: user?.id,
      isRead: false,
    },
  });

  return (
    <UserProvider>
      <div className="flex h-screen flex-col overflow-auto bg-[url('/patterns/pattern-light.png')]">
        <NavBar user={user} notifCount={notifCount} />

        <div className="container mx-auto mt-5 h-full max-w-8xl pt-14">
          <section className="mx-auto flex h-full w-full max-w-8xl ">
            <LeftSideBar />

            <div className="h-full w-full sm:p-3">{children}</div>
            <RightSideBar />
          </section>
        </div>
      </div>
    </UserProvider>
  );
};

export default layout;
