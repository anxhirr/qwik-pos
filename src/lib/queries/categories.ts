import { prisma } from "~/routes/plugin@auth";
import { CategoryFormType } from "~/validation";

export const getAllCategories = async (shopId: string) => {
  return await prisma.category.findMany({
    where: {
      shopId,
    },
  });
}

export const getItemCategories = async (shopId: string) => {
  return await prisma.category.findMany({
    where: {
      shopId,
      types: {
        hasSome: ["ITEM"]
      }
    },
  });
}

export const getCustomerCategories = async (shopId: string) => {
  return await prisma.category.findMany({
    where: {
      shopId,
      types: {
        hasSome: ["CUSTOMER"]
      }
    },
  });
}

type CategoryDbType = CategoryFormType & { shopId: string };

export const createCategory = async ({ name, color, types, shopId }: CategoryDbType) => {
  return await prisma.category.create({
    data: {
      name,
      color,
      types,
      shop: {
        connect: {
          id: shopId,
        },
      },
    },
  });
}

export const updateCategory = async (id:string,{ name, color, types }: CategoryFormType) => {
  return await prisma.category.update({
    where: {
      id,
    },
    data: {
      name,
      color,
      types
    },
  });
}