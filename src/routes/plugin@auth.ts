import { serverAuth$ } from "@builder.io/qwik-auth";
import GitHub from "@auth/core/providers/github";
import type { Provider } from "@auth/core/providers";
import { PrismaAdapter } from "@auth/prisma-adapter";
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
      async redirect({ baseUrl }) {
        return baseUrl;
      },

      session: async ({ session, user }) => {
        console.log("user", user);
        const shop = await prisma.shop.findFirst({
          where: { users: { some: { id: user.id } } },
        });
        console.log("shop", shop);

        if (!shop) {
          console.log("creating shop");
          await prisma.shop.create({
            data: {
              name: "My First Shop",
              address: user.email,
              baseCurrency: "ALL",
              city: "",
              description: "",
              email: "",
              phone: "",
              ownerId: user.id,
              // users: { connect: { id: user.id } },TODO: add this, also the role
            },
          });
        }

        return {
          ...session,
          userId: user.id,
        };
      },
    },
  }));
