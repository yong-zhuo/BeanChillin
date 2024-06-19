import { INFINITE_SCROLL_RESULTS } from '@/config'
import prisma from '@/lib/prisma'
import React from 'react'
import PostFeed from '../post/PostFeed'



const GeneralFeed = async () => {
    const posts = await prisma.post.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            votes:true,
            author:true,
            comments:true,
            group:true
        },
        take: INFINITE_SCROLL_RESULTS,
    })
  return (
   <PostFeed initPosts={posts} />
  )
}

export default GeneralFeed