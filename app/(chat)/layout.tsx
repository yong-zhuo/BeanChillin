import { UserProvider } from "@/components/home/UserContext";
import NavBar from "@/components/home/navbar/NavBar";
import { getServerSession } from "next-auth";
import { CustomSessionUser, Oauth } from "@/lib/users/OAuth";
import ChatList from "@/components/home/chat/ChatList";
import { getFriendsById } from "@/lib/friends/get-friends-by-id";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Chat | BeanChillin",
    description: "Welcome to BeanChillin!",
};

interface HomeLayoutProps {
    children: React.ReactNode;
}

const layout = async ({ children }: HomeLayoutProps) => {
    const [session, friends] = await Promise.all([getServerSession(Oauth), getFriendsById()]);
    if (!session) {
        redirect("/login");
    }
    const user = await prisma.user.findUnique({
        where: {
            email: session?.user?.email as string,
        },
    });

    return (
        <UserProvider>
            <div className="flex h-screen flex-col bg-[url('/patterns/pattern-light.png')] overflow-hidden">
                <NavBar user={user} />
                <div className="sm:container max-w-8xl sm:mx-auto h-full pt-14 mt-5">
                    <section className="max-w-8xl mx-auto flex h-full w-full items-center 3xl:items-start">
                        <div className='hidden sm:flex w-full max-w-xs grow flex-col gap-y-5 overflow-y-auto mt-1 3xl:mt-6  p-5 sm:h-[85vh] 3xl:h-[86vh]  justify-between bg-white shadow-md rounded-lg'>
                            <div className='text-md font-semibold leading-6 text-pri'>Your chats</div>
                            {friends.length === 0 && (<p className="">No chats yet</p>)}
                            <nav className="flex flex-1 flex-col">
                                <ul role='list' className='flex flex-1 flex-col gap-y-7'>
                                    <li><ChatList friends={friends} /></li>
                                </ul>
                            </nav>
                        </div>
                        <div className="h-full w-full sm:p-3">{children}</div>
                    </section>
                </div>
            </div>
        </UserProvider>
    );
};

export default layout;
