import { z } from "zod"

export const createGroupSchema = z.object({groupName: z.string().min(1,{message:"Group Name is required"}),
                                            groupDescription: z.string().min(1,{message:"Group Description is required"}),
                                            groupType: z.optional(z.string())});
                                                      
                                      

export type createGroup = z.infer<typeof createGroupSchema>;