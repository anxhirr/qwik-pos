import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { InitialValues, ResponseData } from "@modular-forms/qwik";
import {
  formAction$,
  getErrors,
  getValues,
  useFormStore,
  valiForm$,
} from "@modular-forms/qwik";
import { ItemForm } from "~/components/forms/item/ItemForm";
import { prisma } from "~/routes/plugin@auth";
import {
  type ItemFormType,
  ItemSchema,
} from "~/types-and-validation/itemSchema";
import { getSessionSS } from "~/utils/auth";

export const useFormLoader = routeLoader$<InitialValues<ItemFormType>>(() => ({
  name: "",
  unit: "",
  category: "",
  barcode: "",
  code: "",
  description: "",
  active: true,
  favorite: true,
  priceRules: [
    {
      start: new Date(),
      end: new Date("2222-12-31"),
      price: 0,
    },
  ],
}));

export const useFormAction = formAction$<ItemFormType, ResponseData>(
  async (values, event) => {
    console.log("values", values);
    const session = getSessionSS(event);

    const item = await prisma.item.create({
      data: {
        name: values.name,
        unit: values.unit,
        category: values.category,
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
    fieldArrays: ["priceRules"],
  });

  console.log("error", getErrors(form));
  const values = getValues(form);
  console.log("values", values);

  return <ItemForm form={form} action={action} categories={categories.value} />;
});
