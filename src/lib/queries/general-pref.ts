import { prisma } from "~/routes/plugin@auth";

export const getGeneralPref = async (shopId: string, userId: string) => {
  const pref = await prisma.generalPref.findFirst({
    where: {
      shopId,
      userId
    },
  });
  return pref;
}
