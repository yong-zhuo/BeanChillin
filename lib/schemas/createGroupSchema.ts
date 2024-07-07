import { z } from "zod"

export const createGroupSchema = z.object({name: z.string().min(1,{message:"Group Name is required"}).max(18,{message:"Must be less than 18 characters"}),
                                            description: z.string().min(1,{message:"Group Description is required"}).max(50, {message:"Must be less than 50 characters"}),
                                            picture: z.optional(z.instanceof(File).refine((file) => file.size < 100 * 1024 * 1024, { message: "File size must be less than 1MB." })),
                                            banner: z.optional(z.instanceof(File).refine((file) => file.size < 100 * 1024 * 1024, { message: "File size must be less than 1MB." })),
                                            type: z.string({message:"Please select a category"}),});
                                                      
export const MembershipValidator = z.object({groupId:z.string()})

export type createGroup = z.infer<typeof createGroupSchema>;
export type MembershipPayload = z.infer<typeof MembershipValidator>;