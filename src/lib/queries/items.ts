import { prisma } from "~/routes/plugin@auth";

export const getAllItems = async (shopId: string) => {
  return await prisma.item.findMany({
    where: {
      shopId,
    },
  });
}