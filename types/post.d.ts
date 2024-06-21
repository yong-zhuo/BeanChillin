import { Group, Post, User, Comment, Vote } from "@prisma/client";

export type DetailedPost = Post & {
    group: Group, 
    votes: Vote[],
    author: User,
    comments: Comment[]
}
