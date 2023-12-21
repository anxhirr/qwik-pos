import { prisma } from "~/routes/plugin@auth";

export const getOrderPref = async (shopId: string, userId: string) => {
  const pref = await prisma.orderPref.findFirst({
    where: {
      shopId,
      userId
    },
  });
  return pref;
}
