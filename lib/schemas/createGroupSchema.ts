import { z } from "zod"

export const createGroupSchema = z.object({groupName: z.string().min(1,{message:"Group Name is required"}),
                                            groupDescription: z.string().min(1,{message:"Group Description is required"}),
                                            groupImage: z.optional(z.instanceof(File).refine((file) => file.size < 100 * 1024 * 1024, { message: "File size must be less than 1MB." })),
                                            groupBanner: z.optional(z.instanceof(File).refine((file) => file.size < 100 * 1024 * 1024, { message: "File size must be less than 1MB." })),
                                            groupType: z.string({message:"Please select a category"}),});
                                                      
                                      

export type createGroup = z.infer<typeof createGroupSchema>;