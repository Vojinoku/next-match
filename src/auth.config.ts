import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { loginSchema } from "./app/lib/schemas/loginSchema";
import { getUserByEmail } from "./app/actions/authActions";
import { compare } from "bcryptjs";

export default {
  providers: [
    Credentials({
      name: "credentials",
      authorize: async (creds) => {
        const validated = loginSchema.safeParse(creds);

        if (validated.success) {
          const { email, password } = validated.data;
          const user = await getUserByEmail(email);

          if (!user || !(await compare(password, user.passwordHash)))
            return null;

          return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
