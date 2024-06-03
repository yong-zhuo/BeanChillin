import { UserProvider } from "@/components/home/UserContext";
import NavBar from "@/components/home/navbar/NavBar";
import LeftSideBar from "@/components/home/sidebar-left/LeftSideBar";
import RightSideBar from "@/components/home/sidebar-right/RightSideBar";

export const metadata = {
  title: "Home | BeanChillin",
  description: "Welcome to BeanChillin!",
};

interface HomeLayoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: HomeLayoutProps) => {
  return (
    <UserProvider>
      <div className="flex h-screen flex-col bg-[url('/patterns/pattern-light.png')] overflow-hidden">
        <NavBar />
        <div className="container max-w-8xl mx-auto h-full pt-14 mt-5">
          <section className="max-w-8xl mx-auto flex h-full w-full ">
              <LeftSideBar />
            <div className="h-full w-full overflow-hidden p-3">{children}</div>
            <RightSideBar />
          </section>
        </div>
      </div>
    </UserProvider>
  );
};

export default layout;
