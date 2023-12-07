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
        const shop = await prisma.shop.findFirst({
          where: {
            users: {
              some: {
                userId: user.id,
              },
            },
          },
          include: {
            users: true,
          },
        });

        if (shop) {
          return {
            ...session,
            userId: user.id,
            shopId: shop.id,
            roleId: shop.users.find((u) => u.userId === user.id)?.roleId,
          };
        }

        // NEW USER, CREATE SHOP

        const newShop = await prisma.shop.create({
          data: {
            name: "My First Shop",
            address: user.email,
            baseCurrency: "ALL",
            city: "",
            description: "",
            email: "",
            phone: "",
            ownerId: user.id,
          },
        });

        const role = await prisma.role.create({
          data: {
            name: "Owner",
            description: "Owner of the shop",
            userId: user.id,
            shopId: newShop.id,
          },
        });

        await prisma.userShop.create({
          data: {
            userId: user.id,
            shopId: newShop.id,
            roleId: role.id,
          },
        });

        return {
          ...session,
          userId: user.id,
          shopId: newShop.id,
          roleId: role.id,
        };
      },
    },
  }));
