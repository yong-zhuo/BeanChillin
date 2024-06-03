import { z } from "zod"

export const createGroupSchema = z.object({groupName: z.string().min(1,{message:"Group Name is required"}),
                                            groupDescription: z.string().min(1,{message:"Group Description is required"}),
                                            groupType: z.string({message:"Please select a category"}),});
                                                      
                                      

export type createGroup = z.infer<typeof createGroupSchema>;