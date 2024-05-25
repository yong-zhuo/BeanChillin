import { z } from "zod"

export const onboardSchema = z.object({});

export type login = z.infer<typeof onboardSchema>;