import { z } from "zod";

export const createPostSchema = z.object({
    title: z.string().min(3, {message:'Title must be at least 3 characters long'}).max(100, {
        message:'Title must be less than 100 characters long'
    }),
    groupId: z.string(),
    content:z.any()
})

export type CreatePostType = z.infer<typeof createPostSchema>