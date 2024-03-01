import { CategoriesBottomNav } from "~/components/bottom-nav/categories";

import { $, component$, useSignal } from "@builder.io/qwik";
import { routeAction$, routeLoader$ } from "@builder.io/qwik-city";
import { prisma } from "../plugin@auth";
import { CategoryCard } from "~/components/cards/CategoryCard";
import { CategoryDialog } from "~/components/dialogs";
import {
  CategorySchema,
  type CategoryFormType,
} from "~/types-and-validation/categorySchema";
import { formAction$, valiForm$ } from "@modular-forms/qwik";
import { getSessionSS } from "~/utils/auth";
import { createCategory, updateCategory } from "~/lib/queries/categories";
import type { CRUDactions } from "../../../types";

export const useCategoriesLoader = routeLoader$(async () => {
  const categories = await prisma.category.findMany();
  return categories;
});

export const useCreateFormAction = formAction$<CategoryFormType>(
  async (values, event) => {
    const session = getSessionSS(event);

    const newCategory = await createCategory({
      name: values.name,
      color: values.color,
      type: values.type,
      shopId: session.shopId,
    });

    if (!newCategory.id) {
      return {
        status: "error",
        message: "Category not created",
      };
    }
    return {
      status: "success",
      message: "Category created successfully",
    };
  },
  valiForm$(CategorySchema),
);
export const useUpdateFormAction = formAction$<CategoryFormType>(
  async (values, event) => {
    const session = getSessionSS(event);
    console.log("session", session);

    // TODO: update category
    const updated = await updateCategory(
      "id", // TODO: replace with actual "id"
      {
        name: values.name,
        color: values.color,
        type: values.type,
      },
    );

    if (!updated.id) {
      return {
        status: "error",
        message: "Category not updated",
      };
    }
    return {
      status: "success",
      message: "Category updated successfully",
    };
  },
  valiForm$(CategorySchema),
);

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
  const deleteRouteAction = useDeleteCategory();
  const createFormAction = useCreateFormAction();
  const updateFormAction = useUpdateFormAction();

  const showDialog = useSignal(false);
  const dialodMode = useSignal<CRUDactions>("CREATE");
  const dialogFormData = useSignal<CategoryFormType>({
    color: "",
    name: "",
    type: "",
  });

  const showCreateDialog = $(() => {
    showDialog.value = true;
    dialodMode.value = "CREATE";
  });
  const showUpdateDialog = $(() => {
    showDialog.value = true;
    dialodMode.value = "UPDATE";
  });
  const hideDialog = $(() => {
    showDialog.value = false;
  });

  return (
    <>
      <div class="main-content">
        <ul class="3xl:grid-cols-5 grid grid-cols-1 gap-4  sm:grid-cols-3 xl:grid-cols-4">
          {data.value.map((cat) => {
            const { id, name, color, type } = cat;
            return (
              <li key={id} class="h-full">
                <CategoryCard
                  data={cat}
                  onDeleteConfirm$={async (id) => {
                    try {
                      const res = await deleteRouteAction.submit({ id });
                      console.log("res", res);
                      if (res.status === 200) {
                        console.log("success");
                      }
                    } catch (error) {
                      console.log("error", error);
                    }
                  }}
                  onEdit$={() => {
                    console.log("edit");
                    showUpdateDialog();
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
          hide={hideDialog}
          formData={dialogFormData.value}
          action={
            dialodMode.value === "CREATE" ? createFormAction : updateFormAction
          }
          mode={dialodMode.value}
        />
      </div>
      <CategoriesBottomNav onCreateNew={showCreateDialog} />
    </>
  );
});
