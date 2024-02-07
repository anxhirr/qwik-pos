import { CategoriesBottomNav } from "~/components/bottom-nav/categories";

import { $, component$, useSignal } from "@builder.io/qwik";
import { routeAction$, routeLoader$ } from "@builder.io/qwik-city";
import { prisma } from "../plugin@auth";
import { CategoryCard } from "~/components/cards/CategoryCard";
import { CategoryDialog } from "~/components/dialogs";
import type { CategoryFormType } from "~/types-and-validation/categorySchema";

export const useCategoriesLoader = routeLoader$(async () => {
  const categories = await prisma.category.findMany();
  return categories;
});

export const useDeleteCategory = routeAction$(async (cat, { fail }) => {
  const { id } = cat;
  if (!id || typeof id !== "string") {
    fail(500, {
      message: "id is missing",
    });
    return;
  }

  const result = await prisma.category.delete({ where: { id } });
  console.log("result", result);

  return {
    status: 200,
    message: "Category deleted successfully",
  };
});

export default component$(() => {
  const data = useCategoriesLoader();
  const action = useDeleteCategory();
  const showDialog = useSignal(false);
  const dialogFormData = useSignal<CategoryFormType>({
    color: "",
    name: "",
    type: "",
  });

  return (
    <>
      <div class="flex-1">
        <ul class="3xl:grid-cols-5 grid grid-cols-1 gap-4  sm:grid-cols-3 xl:grid-cols-4">
          {data.value.map((cat) => {
            const { id, name, color, type } = cat;
            return (
              <li key={id} class="h-full">
                <CategoryCard
                  data={cat}
                  handleDelete$={async () => {
                    try {
                      const res = await action.submit(cat);
                      console.log("res", res);
                      if (res.status === 200) {
                        console.log("success");
                      }
                    } catch (error) {
                      console.log("error", error);
                    }
                  }}
                  handleEdit$={() => {
                    showDialog.value = true;
                    dialogFormData.value = {
                      name,
                      color,
                      type,
                    };
                  }}
                />
              </li>
            );
          })}
        </ul>

        <CategoryDialog
          show={showDialog}
          hide={$(() => {
            console.log("hide");
            showDialog.value = false;
          })}
          formData={dialogFormData.value}
        />
      </div>
      <CategoriesBottomNav
        onCreateNew={$(() => {
          showDialog.value = true;
        })}
      />
    </>
  );
});
