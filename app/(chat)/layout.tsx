import { UserProvider } from "@/components/home/UserContext";
import NavBar from "@/components/home/navbar/NavBar";
import { getServerSession } from "next-auth";
import { CustomSessionUser, Oauth } from "@/lib/users/OAuth";
import ChatList from "@/components/home/chat/ChatList";
import { getFriendsById } from "@/lib/friends/get-friends-by-id";

export const metadata = {
    title: "Chat | BeanChillin",
    description: "Welcome to BeanChillin!",
};

interface HomeLayoutProps {
    children: React.ReactNode;
}

const layout = async ({ children }: HomeLayoutProps) => {
    const friends = await getFriendsById();
    return (
        <UserProvider>
            <div className="flex h-screen flex-col bg-[url('/patterns/pattern-light.png')] overflow-hidden">
                <NavBar />
                <div className="container max-w-8xl mx-auto h-full pt-14 mt-5">
                    <section className="max-w-8xl mx-auto flex h-full w-full ">
                        <div className='w-full flex h-screen max-w-xs grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 p-6'>
                            {friends.length > 0 ? (<div className='text-s font-semibold leading-6 text-gray-400'>Your chats</div>
                            ) : null}
                            <nav className="flex flex-1 flex-col">
                                <ul role='list' className='flex flex-1 flex-col gap-y-7'>
                                    <li><ChatList friends={friends} /></li>
                                </ul>
                            </nav>
                        </div>
                        <div className="h-full w-full p-3">{children}</div>
                    </section>
                </div>
            </div>
        </UserProvider>
    );
};

export default layout;
