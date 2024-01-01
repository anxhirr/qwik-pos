import { prisma } from "~/routes/plugin@auth";

export const getAllCategories = async (shopId: string) => {
  return await prisma.category.findMany({
    where: {
    shopId,
    },
  });
}