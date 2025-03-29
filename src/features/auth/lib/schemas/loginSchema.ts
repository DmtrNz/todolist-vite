import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().min(1, { message: "Email is reqiured" }).email(),
  password: z.string().min(3, { message: "Password must be at least 3 characters" }),
  rememberMe: z.boolean(),
})

export type Inputs = z.infer<typeof loginSchema>