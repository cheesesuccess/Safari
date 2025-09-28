import { handlers } from "@/auth";
import NextAuth from "next-auth"

export const authOptions = {
  providers: [
    // Your providers here
  ],
  trustHost: true, // <-- add this
  // ...any other config
}

export const { GET, POST } = handlers;
