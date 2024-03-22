import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import {
  type InitialValues,
  useFormStore,
  valiForm$,
  formAction$,
  type ResponseData,
} from "@modular-forms/qwik";
import { UpdateItemBottomNav } from "~/components/bottom-nav";
import { ItemForm } from "~/components/forms/item/ItemForm";
import { getAllCategories } from "~/lib/queries/categories";
import { prisma } from "~/routes/plugin@auth";
import {
  type ItemFormType,
  ItemSchema,
} from "~/types-and-validation/itemSchema";
import { getSessionSS } from "~/utils/auth";

export const useFormLoader = routeLoader$<InitialValues<ItemFormType>>(
  async (event) => {
    const session = getSessionSS(event);
    const { id } = event.params;

    const item = await prisma.item.findUnique({
      where: { id, shopId: session.shopId },
      include: {
        priceRules: true,
      },
    });
    console.log("item", item);

    if (!item) {
      throw new Error("Item not found");
    }

    return {
      active: item.active,
      barcode: item.barcode,
      code: item.code,
      description: item.description,
      favorite: item.favorite,
      name: item.name,
      unit: item.unit,
      priceRules: item.priceRules.map((rule) => ({
        ...rule,
        start: new Date(rule.start).toISOString(),
        end: new Date(rule.end).toISOString(),
      })),

      categoryIDs: item.categoryIDs,
    };
  },
);

export const useFormAction = formAction$<ItemFormType, ResponseData>(
  async (values, event) => {
    const session = getSessionSS(event);
    const { id } = event.params;

    const current = await prisma.item.findUnique({
      where: { id },
      select: { categoryIDs: true },
    });

    const existingCatIds = current?.categoryIDs || [];

    const item = await prisma.item.update({
      where: { id },
      data: {
        name: values.name,
        unit: values.unit,
        barcode: values.barcode,
        code: values.code,
        description: values.description,
        active: values.active,
        favorite: values.favorite,
        shop: {
          connect: {
            id: session.shopId,
          },
        },
        priceRules: {
          deleteMany: {},
          create: values.priceRules.map((rule) => ({
            start: new Date(rule.start),
            end: new Date(rule.end),
            price: rule.price,
          })),
        },
        categories: {
          disconnect: existingCatIds.map((id) => ({ id })),
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

export const useCategoriesLoader = routeLoader$(async (event) => {
  const session = getSessionSS(event);
  const categories = await getAllCategories(session.shopId, ["ITEM"]);
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
      <UpdateItemBottomNav form={form} />
    </>
  );
});
