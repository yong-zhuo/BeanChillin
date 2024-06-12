import { UserProvider } from "@/components/home/UserContext";
import NavBar from "@/components/home/navbar/NavBar";
import ChatBar from "@/components/home/chat/ChatBar";

export const metadata = {
    title: "Chat | BeanChillin",
    description: "Welcome to BeanChillin!",
};

interface HomeLayoutProps {
    children: React.ReactNode;
}

const layout = ({ children }: HomeLayoutProps) => {
    return (
        <UserProvider>
            <div className="flex h-screen flex-col bg-[url('/patterns/pattern-light.png')] overflow-auto">
                <NavBar />
                <div className="container max-w-8xl mx-auto h-full pt-14 mt-5">
                    <section className="max-w-8xl mx-auto flex h-full w-full ">
                        <ChatBar />
                        <div className="h-full w-full p-3">{children}</div>
                    </section>
                </div>
            </div>
        </UserProvider>
    );
};

export default layout;
