import { z } from "zod"

export const forgetSchema = z.object({forgetPassword: z.string().min(1,{message:"Email is required"})
                                                      .email({message:"Email format is invalid"})
                                       });

export type forget = z.infer<typeof forgetSchema>;