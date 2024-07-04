import { UserProvider } from "@/components/home/UserContext";
import NavBar from "@/components/home/navbar/NavBar";
import { getServerSession } from "next-auth";
import { CustomSessionUser, Oauth } from "@/lib/users/OAuth";
import ChatList from "@/components/home/chat/ChatList";
import { getFriendsById } from "@/lib/friends/get-friends-by-id";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

const page = async () => {
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
        <div className="flex sm:hidden h-full flex-col bg-[url('/patterns/pattern-light.png')] overflow-hidden">
            <div className="sm:container max-w-8xl mx-3 h-full">
                <section className="max-w-8xl mx-auto flex h-full w-full items-center 3xl:items-start">
                    <div className='w-full max-w-xs grow mx-auto p-3 flex-col gap-y-5 overflow-y-auto h-[70vh] justify-between bg-white shadow-md rounded-lg'>
                        <div className='text-md font-semibold leading-6 text-pri'>Your chats</div>
                        {friends.length === 0 && (<p className="">No chats yet</p>)}
                        <nav className="flex flex-1 flex-col">
                            <ul role='list' className='flex flex-1 flex-col gap-y-7'>
                                <li><ChatList friends={friends} /></li>
                            </ul>
                        </nav>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default page