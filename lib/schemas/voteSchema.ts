import { z } from 'zod'

export const postVoteSchema = z.object({
  postId: z.string(),
  voteType: z.enum(['UPVOTE', 'DOWNVOTE']),
})

export const commentVoteSchema = z.object({
  commentId: z.string(),
  voteType: z.enum(['UPVOTE', 'DOWNVOTE']),
})

export type PostVoteType = z.infer<typeof postVoteSchema>
export type CommentVoteType = z.infer<typeof commentVoteSchema>

