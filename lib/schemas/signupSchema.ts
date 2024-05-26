import { z } from "zod"

export const signupSchema = z.object({email: z.string().min(1, {message:"Email is required"})
                                                      .email({message:"Email format is invalid"}),
                                      password: z.string().min(8, {message:"At least 8 characters long"}),
                                      confirm: z.string().min(8, {message:"At least 8 characters long"})
                                      })
                             .refine((data) => data.password === data.confirm, {message: "Password does not match", path:["confirm"]});

export type signup = z.infer<typeof signupSchema>;