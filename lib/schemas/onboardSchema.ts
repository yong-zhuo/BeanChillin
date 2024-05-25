import { z } from "zod"

export const onboardSchema = z.object({ 
    
    firstName: z.string(),
    lastName: z.string(),
    image: z.string(),
    bio: z.string() .max(160, {
      message: "Bio must not be longer than 30 characters.",
    }),});

export type onboard = z.infer<typeof onboardSchema>;