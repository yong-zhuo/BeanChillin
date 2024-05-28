import { z } from "zod"

export const resetSchema = z.object({
                                      password: z.string().min(8, {message:"At least 8 characters long"}),
                                      confirm: z.string().min(8, {message:"At least 8 characters long"})
                                      })
                             .refine((data) => data.password === data.confirm, {message: "Password does not match", path:["confirm"]});

export type reset = z.infer<typeof resetSchema>;