import { INFINITE_SCROLL_RESULTS } from '@/config'
import prisma from '@/lib/prisma'
import React from 'react'
import PostFeed from '../post/PostFeed'
import { getServerSession } from 'next-auth'
import { Oauth } from '@/lib/users/OAuth'
import { DetailedPost } from '@/types/post'
import { Card } from '@/components/common-ui/shadcn-ui/card'
import { Construction } from 'lucide-react'

const HomeFeed = async () => {
    /** 
    const session = await getServerSession(Oauth);

    let posts: DetailedPost[] = [];
    const history = await prisma.user.findUnique({
        where: {
            email: session?.user?.email!,
        },
    });
    try {
        if ((history?.latestViewedPosts.length ?? 0) > 0) {
            const reco = await fetch('https://beanchillin-ml.onrender.com/recommend_posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: history?.latestViewedPosts,
                    offset: 0,
                    limit: 5,
                }),
            });
            const recoPosts = await reco.json();
            posts = await prisma.post.findMany({
                where: {
                    id: {
                        in: recoPosts,
                    },
                },
                include: {
                    votes: true,
                    author: true,
                    comments: true,
                    group: true
                },
            }) as DetailedPost[];
        } else {
            posts = await prisma.post.findMany({
                include: {
                    votes: true,
                    author: true,
                    comments: true,
                    group: true
                },
                take: 5,
                skip: 0,
                orderBy: {
                    createdAt: 'desc',
                },
            });
        }
    } catch (error) {
        posts = await prisma.post.findMany({
            include: {
                votes: true,
                author: true,
                comments: true,
                group: true
            },
            take: 5,
            skip: 0,
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
*/

        {/** <PostFeed initPosts={posts} feedType='home' /> */}
    return (
        
        <div>
            <Card>
                <div className="flex items-center justify-center">
                    <h2 className="text-lg font-semibold flex flex-row justify-center items-center p-5">Under Maintenance <Construction className="h-5 w-5" /></h2>
                </div>
            </Card>
        </div>

    )
}
export default HomeFeed