import { prisma } from "~/routes/plugin@auth";

export const getAllOrders = async (shopId: string) => {
  return await prisma.order.findMany({
    where: {
      shopId,
    },
  });
}