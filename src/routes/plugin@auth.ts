import { serverAuth$ } from "@builder.io/qwik-auth";
import GitHub from "@auth/core/providers/github";
// import Google from "@auth/core/providers/google";
import type { Provider } from "@auth/core/providers";
import { PrismaAdapter } from "@auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client";
import { PrismaClient } from "@prisma/client/edge";

export const prisma = new PrismaClient();

export const { onRequest, useAuthSession, useAuthSignin, useAuthSignout } =
  serverAuth$(({ env }) => ({
    secret: env.get("AUTH_SECRET"),
    trustHost: true,
    adapter: PrismaAdapter(prisma),
    providers: [
      GitHub({
        clientId: env.get("GITHUB_ID")!,
        clientSecret: env.get("GITHUB_SECRET")!,
      }),
      // Google({
      //   clientId: env.get("GOOGLE_ID")!,
      //   clientSecret: env.get("GOOGLE_SECRET")!,
      // }),
    ] as Provider[],
    callbacks: {
      async redirect({ url, baseUrl }) {
        console.log("REDIRECT", url, baseUrl);
        return baseUrl;
      },

      session: async ({ session, user }) => {
        return {
          ...session,
          userId: user.id,
        };
      },
    },
  }));
