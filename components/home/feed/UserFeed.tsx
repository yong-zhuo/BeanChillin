import { INFINITE_SCROLL_RESULTS } from '@/config'
import prisma from '@/lib/prisma'
import React from 'react'
import PostFeed from '../post/PostFeed'

interface UserFeedProps {
    authorId: string
}

const UserFeed = async (params: UserFeedProps) => {
    const posts = await prisma.post.findMany({
        where: {
            authorId: params.authorId
        },
        include: {
            votes: true,
            author: true,
            comments: true,
            group: true
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: INFINITE_SCROLL_RESULTS,
    })

    return (
        <PostFeed initPosts={posts} feedType='user' authorId={params.authorId} />
    )
}

export default UserFeed