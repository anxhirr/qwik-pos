import { routeAction$, zod$ } from "@builder.io/qwik-city";
import { createCategory } from "~/lib/queries/categories";
import { getSessionSS } from "~/utils";
import { categorySchema } from "~/validation";

export const useCreateCategoryRouteAction = routeAction$(async (cat, event) => {
  const session = getSessionSS(event);
  const { name, color, types } = cat;

  const res = await createCategory({
    name,
    color,
    types,
    shopId: session.shopId,
  });

  if (!res.id) {
    event.fail(500, {
      message: "Error creating category",
      data: res,
    });
  }

  return {
    status: "success",
    message: "Category created successfully",
    data: res,
  };
}, zod$(categorySchema));
