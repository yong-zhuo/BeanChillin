import { INFINITE_SCROLL_RESULTS } from '@/config'
import prisma from '@/lib/prisma'
import React from 'react'
import PostFeed from '../post/PostFeed'



const GeneralFeed = async () => {
    const posts = await prisma.post.findMany({
        include: {
            votes:true,
            author:true,
            comments:true,
            group:true
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: INFINITE_SCROLL_RESULTS,
    })
  return (
   <PostFeed initPosts={posts} feedType='general'/>
  )
}

export default GeneralFeed