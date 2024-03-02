import { LISTS_DEFAULT_SKIP, LISTS_DEFAULT_TAKE } from "~/constants/defaults";
import { prisma } from "~/routes/plugin@auth";

export const getAllItems = async (shopId: string) => {
  return await prisma.item.findMany({
    where: {
      shopId,
    },
    include: {
      priceRules: true,
    },
  });
}

export const getInfinitItems = async (shopId: string, skip: number =LISTS_DEFAULT_SKIP, take: number = LISTS_DEFAULT_TAKE) => {
  return await prisma.item.findMany({
    where: {
      shopId,
    },
    include: {
      priceRules: true,
    },
    skip: skip,
    take,
  });
}