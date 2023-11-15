import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { InitialValues, ResponseData } from "@modular-forms/qwik";
import { formAction$, useFormStore, valiForm$ } from "@modular-forms/qwik";
import { AdvancedItemForm } from "~/components/forms/items/AdvancedItemForm";
import { prisma } from "~/routes/plugin@auth";
import { type ItemForm, ItemSchema } from "~/types-and-validation/item";

export const useFormLoader = routeLoader$<InitialValues<ItemForm>>(() => ({
  name: "",
  unit: "",
  category: "",
  barcode: "",
  code: "",
  description: "",
  active: true,
  favorite: true,
}));

export const useFormAction = formAction$<ItemForm, ResponseData>(
  async (values) => {
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

export default component$(() => {
  const action = useFormAction();
  const form = useFormStore<ItemForm, ResponseData>({
    loader: useFormLoader(),
    validate: valiForm$(ItemSchema),
  });

  return <AdvancedItemForm form={form} action={action} />;
});
