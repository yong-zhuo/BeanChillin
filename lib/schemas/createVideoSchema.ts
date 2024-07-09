import { z } from "zod";

export const createVideoSchema = z.object({
    title: z.string().min(3, { message: 'Title must be at least 3 characters long' }).max(100, {
        message: 'Title must be less than 100 characters long'
    }),
    description: z.string().min(3, { message: 'Description must be at least 3 characters long' }).max(100, {
        message: 'description must be less than 100 characters long'
    }),
    members: z.number().min(0, { message: 'Members must be at least 0' }),
})

export type CreateVideo = z.infer<typeof createVideoSchema>