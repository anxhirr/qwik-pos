import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { InitialValues, ResponseData } from "@modular-forms/qwik";
import { formAction$, useFormStore, valiForm$ } from "@modular-forms/qwik";
import { CreateItemBottomNav } from "~/components/bottom-nav/item";
import { ItemForm } from "~/components/forms/item/ItemForm";
import { PRICE_END_DATE, PRICE_START_DATE } from "~/constants/defaults";
import { prisma } from "~/routes/plugin@auth";
import {
  type ItemFormType,
  ItemSchema,
} from "~/types-and-validation/itemSchema";
import { getSessionSS } from "~/utils/auth";

export const useFormLoader = routeLoader$<InitialValues<ItemFormType>>(() => {
  const loader = {
    name: "",
    unit: "",
    category: "",
    categoryIDs: [""], // TODO: categories picker does not show if array is empty
    barcode: "",
    code: "",
    description: "",
    active: true,
    favorite: true,
    priceRules: [
      {
        start: PRICE_START_DATE.toISOString(),
        end: PRICE_END_DATE.toISOString(),
        price: 0,
      },
    ],
  };
  return loader;
});

export const useFormAction = formAction$<ItemFormType, ResponseData>(
  async (values, event) => {
    const session = getSessionSS(event);

    const item = await prisma.item.create({
      data: {
        name: values.name,
        unit: values.unit,
        barcode: values.barcode,
        code: values.code,
        description: values.description,
        active: values.active,
        favorite: values.favorite,
        priceRules: {
          create: values.priceRules,
        },
        shop: {
          connect: {
            id: session.shopId,
          },
        },
        categories: {
          connect: values.categoryIDs.map((id) => ({ id })),
        },
      },
    });

    if (!item.id) {
      return {
        status: "error",
        message: "Error creating item",
      };
    }

    return {
      status: "success",
      data: item,
    };
  },
  valiForm$(ItemSchema),
);

export const useCategoriesLoader = routeLoader$(async () => {
  const categories = await prisma.category.findMany();
  return categories;
});

export default component$(() => {
  const action = useFormAction();
  const categories = useCategoriesLoader();

  const form = useFormStore<ItemFormType, ResponseData>({
    loader: useFormLoader(),
    validate: valiForm$(ItemSchema),
    fieldArrays: ["priceRules", "categoryIDs"],
  });

  return (
    <>
      <div class="main-content">
        <ItemForm form={form} action={action} categories={categories.value} />
      </div>
      <CreateItemBottomNav form={form} />
    </>
  );
});
