import { prisma } from "~/routes/plugin@auth";
import { CategoryFormType } from "~/types-and-validation/categorySchema";

export const getAllCategories = async (shopId: string) => {
  return await prisma.category.findMany({
    where: {
    shopId,
    },
  });
}

type CategoryType = CategoryFormType & { shopId: string };

export const createCategory = async ({ name, color, types, shopId }: CategoryType) => {
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