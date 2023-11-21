import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import {
  type InitialValues,
  useFormStore,
  valiForm$,
  formAction$,
  type ResponseData,
} from "@modular-forms/qwik";
import { ItemForm } from "~/components/forms/item/ItemForm";
import { prisma } from "~/routes/plugin@auth";
import {
  type ItemFormType,
  ItemSchema,
} from "~/types-and-validation/itemSchema";

export const useFormLoader = routeLoader$<InitialValues<ItemFormType>>(
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

export const useFormAction = formAction$<ItemFormType, ResponseData>(
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
  });

  return (
    <div>
      <ItemForm form={form} action={action} categories={categories.value} />
    </div>
  );
});
