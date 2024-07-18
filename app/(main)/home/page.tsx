import HomeCard from "@/components/home/center/HomeCard";
import prisma from "@/lib/prisma";
import { Oauth } from "@/lib/users/OAuth";
import { Home } from "lucide-react";
import { getServerSession } from "next-auth";
import { User } from "@prisma/client";
import { notFound } from "next/navigation";
export const metadata = {
  title: "Home | BeanChillin",
  description: "Welcome to BeanChillin!",
};

const page = async () => {

  const session = await getServerSession(Oauth);
  let user = null;
  if (session?.user?.email) {
    user = await prisma.user.findUnique({
      where: {
        email: session.user.email
      },
    });
  } else {
    return new Response('User not found', { status: 404 })
  }

  const query = `https://beanchillin-ml.onrender.com/recommend_posts`;
  const res = await fetch(query, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: user?.id,
      offset: 0,
      limit: 5
    })
  })

  if (res.ok) {
    const reco = await res.json();
    const posts = await prisma.post.findMany({
      where: {
        id: {
          in: reco.recommendations
        }
      }
    })
  } else {

  }
  return (
    <div className="sm:container mx-auto mt-3  sm:w-5/6 sm:px-12">
      <h2 className="text-3xl font-extrabold text-center sm:text-start flex flex-row items-center justify-center gap-1 sm:justify-start">Home<Home className="w-7 h-7" /></h2>
      <HomeCard />
    </div>
  );
};

export default page;
