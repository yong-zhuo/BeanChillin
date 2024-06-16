import { z } from "zod"

export const messageValidator = z.object({
    id: z.string(),
    message: z.string(),
    sender_id: z.string().optional(),
    receiver_id: z.string().optional(),
    createdAt: z.date(),
})

export const messaageArrayValidator = z.array(messageValidator)
export type Message = z.infer<typeof messageValidator>