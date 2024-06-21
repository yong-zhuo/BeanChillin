import { Comment, User, CommentVote } from "@prisma/client"

export type DetailedComment = Comment & {
    CommentVote: CommentVote[]
    author: User

}