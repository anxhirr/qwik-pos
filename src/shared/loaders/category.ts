import { routeLoader$ } from "@builder.io/qwik-city";
import { prisma } from "~/routes/plugin@auth";
import { getSessionSS } from "~/utils";

export const useItemCategoriesLoader = routeLoader$(async (event) => {
  const session = getSessionSS(event);
  const categories = await prisma.category.findMany({
    where: {
      shopId: session.shopId,
      types: {
        hasSome: ["ITEM"],
      },
    },
  });
  return categories;
});
