import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import {
  type InitialValues,
  useFormStore,
  valiForm$,
  formAction$,
  type ResponseData,
} from "@modular-forms/qwik";
import { AdvancedItemForm } from "~/components/forms/items/AdvancedItemForm";
import { prisma } from "~/routes/plugin@auth";
import { type ItemForm, ItemSchema } from "~/types-and-validation/item";

export const useFormLoader = routeLoader$<InitialValues<ItemForm>>(
  async ({ params }) => {
    const { id } = params;

    const item = await prisma.item.findUnique({
      where: { id },
    });

    if (!item) {
      throw new Error("Item not found");
    }

    return item;
  },
);

export const useFormAction = formAction$<ItemForm, ResponseData>(
  async (values, event) => {
    const { id } = event.params;

    const item = await prisma.item.update({
      where: { id },
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

  return (
    <div>
      <h1>Item</h1>
      <AdvancedItemForm form={form} action={action} />
    </div>
  );
});
