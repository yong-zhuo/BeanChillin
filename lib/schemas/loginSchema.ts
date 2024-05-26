import { z } from "zod"

export const loginSchema = z.object({email: z.string().min(1,{message:"Email is required"})
                                                      .email({message:"Email format is invalid"}),
                                      password: z.string().min(8, {message:"At least 8 characters long"}) });

export type login = z.infer<typeof loginSchema>;