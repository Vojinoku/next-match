import { object, string } from "zod";
import z from "zod";

export const loginSchema = object({
  email: string().email(),
  password: string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
