import GroupHeader from '@/components/home/group/GroupHeader'
import CreatePost from '@/components/home/post/CreatePost'
import PostFeed from '@/components/home/post/PostFeed'
import { INFINITE_SCROLL_RESULTS } from '@/config'
import prisma from '@/lib/prisma'
import { Oauth } from '@/lib/users/OAuth'
import { Group } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'

interface PageProps {
    params: {
      slug: string
    }
  }
  
  const page = async ({ params }: PageProps) => {
    const session = await getServerSession(Oauth);
    const { slug } = params
  
   /*
    const group = await prisma.group.findFirst({
      where: { name: slug },
      include: {
        posts: {
          include: {
            author: true,
            votes: true,
            comments: true,
            subreddit: true,
          },
          orderBy: {
            createdAt: 'desc'
          },
          take: INFINITE_SCROLL_RESULTS,
        },
      },
    })
  
    if (!group) return notFound()
  */
    return (
      <div>
        <GroupHeader name={slug} joined={true} session={session}/>
      </div>
    )
  }
  
  export default page