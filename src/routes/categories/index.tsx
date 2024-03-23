import { CategoriesBottomNav } from "~/components/bottom-nav/categories";

import { $, component$, useTask$ } from "@builder.io/qwik";
import {
  routeAction$,
  routeLoader$,
  useLocation,
  useNavigate,
} from "@builder.io/qwik-city";
import { prisma } from "../plugin@auth";
import { CategoryCard } from "~/components/cards/CategoryCard";
import { CategoryDialog } from "~/components/dialogs";
import { categorySchema, type CategoryFormType } from "~/validation";
import { formAction$, zodForm$ } from "@modular-forms/qwik";
import { getSessionSS } from "~/utils/auth";
import {
  createCategory,
  getAllCategories,
  updateCategory,
} from "~/lib/queries/categories";
import { checkIsIdValid } from "~/utils/route-action";
import { checkIsSearchParamsIdValid } from "~/utils/form-action";
import type { Category } from "@prisma/client";
import { CATEGORY_EMPTY_DATA } from "~/constants/defaults";
import { useDialog } from "~/components/hooks";
import type { CategoryType } from "../../../types";

export const useCategoriesLoader = routeLoader$(async (event) => {
  const session = getSessionSS(event);
  const categories = await getAllCategories(session.shopId);
  return categories;
});

export const useCreateCategoryFormAction = formAction$<CategoryFormType>(
  async (values, event) => {
    const session = getSessionSS(event);

    const newCategory = await createCategory({
      name: values.name,
      color: values.color,
      types: values.types,
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
  zodForm$(categorySchema),
);

export const useUpdateFormAction = formAction$<CategoryFormType>(
  async (values, event) => {
    const id = event.url.searchParams.get("update");
    if (!checkIsSearchParamsIdValid(id)) {
      return {
        status: "error",
        message: "id is missing",
      };
    }

    const updated = await updateCategory(id, {
      name: values.name,
      color: values.color,
      types: values.types,
    });

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
  zodForm$(categorySchema),
);
export const useDeleteCategory = routeAction$(async (cat, { fail }) => {
  const { id } = cat;
  if (!checkIsIdValid(id)) {
    fail(500, {
      message: "id is missing",
    });
    return;
  }

  await prisma.category.delete({ where: { id } });

  return {
    status: 200,
    message: "Category deleted successfully",
  };
});

export default component$(() => {
  const data = useCategoriesLoader();
  const loc = useLocation();
  const nav = useNavigate();
  const { pathname } = loc.url;
  const deleteRouteAction = useDeleteCategory();
  const createFormAction = useCreateCategoryFormAction();
  const updateFormAction = useUpdateFormAction();

  const { dialog, actions } = useDialog<CategoryFormType>(CATEGORY_EMPTY_DATA);

  const showCreateDialog = $(() => {
    actions.showCreateDialog();
    nav(`${pathname}?create`);
  });
  const showUpdateDialog = $((cat: Category) => {
    const { id, name, color, types } = cat;

    actions.showUpdateDialog({
      name,
      color,
      types: types as CategoryType[],
    });
    const searchParams = new URLSearchParams({
      update: id,
    });
    nav(`${pathname}?${searchParams.toString()}`);
  });
  const hideDialog = $(() => {
    actions.hideDialog();
    const searchParams = new URLSearchParams();
    nav(`${pathname}?${searchParams.toString()}`);
  });

  useTask$(() => {
    const { searchParams } = loc.url;
    const update = searchParams.get("update");
    const create = searchParams.get("create");

    if (create !== null) showCreateDialog();

    if (update) {
      const cat = data.value.find((c) => c.id === update);
      cat && showUpdateDialog(cat);
    }
  });

  return (
    <>
      <div class="main-content">
        <ul class="3xl:grid-cols-5 grid grid-cols-1 gap-4  sm:grid-cols-3 xl:grid-cols-4">
          {data.value.map((cat) => {
            const { id } = cat;
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
                  onUpdate$={() => showUpdateDialog(cat)}
                />
              </li>
            );
          })}
        </ul>

        <CategoryDialog
          show={dialog.show}
          hide={hideDialog}
          formData={dialog.formData}
          action={
            dialog.mode === "CREATE" ? createFormAction : updateFormAction
          }
          mode={dialog.mode}
        />
      </div>
      <CategoriesBottomNav onCreateNew={showCreateDialog} />
    </>
  );
});
