import { z } from "zod"

export const onboardSchema = z.object({

  firstName: z.string(),
  lastName: z.string(),
  image: z.optional(z.instanceof(File).refine((file) => file.size < 100 * 1024 * 1024, { message: "File size must be less than 1MB." })),
  bio: z.string().max(160, {
    message: "Bio must not be longer than 30 characters.",
  }),
});

export type onboard = z.infer<typeof onboardSchema>;