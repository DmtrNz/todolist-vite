import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().min(1, { message: "Email is reqiured" }).email(),
  password: z.string().min(3, { message: "Password must be at least 3 characters" }),
  rememberMe: z.boolean().optional(),
  captcha: z.string().optional() //optional() значит необязательное свойство 
})

export type Inputs = z.infer<typeof loginSchema>