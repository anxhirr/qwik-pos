import { component$ } from "@builder.io/qwik";
import { CategoryForm } from "../forms/category/CategoryForm";
import type { ResponseData } from "@modular-forms/qwik";
import { formAction$, useFormStore, valiForm$ } from "@modular-forms/qwik";
import type { CategoryFormType } from "~/types-and-validation/categorySchema";
import { CategorySchema } from "~/types-and-validation/categorySchema";
import { prisma } from "~/routes/plugin@auth";
import { CATEGORY_DIALOG_ID, CATEGORY_FORM_ID } from "~/constants/enum";
import { Dialog, DialogBody } from ".";

export const useFormAction = formAction$<CategoryFormType>(async (values) => {
  const newCategory = await prisma.category.create({
    data: {
      name: values.name,
      color: values.color,
      type: values.type,
    },
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
}, valiForm$(CategorySchema));

export const CategoryDialog = component$(() => {
  const action = useFormAction();
  const form = useFormStore<CategoryFormType, ResponseData>({
    loader: {
      value: {
        type: "",
        name: "",
        color: "",
      },
    },
    validate: valiForm$(CategorySchema),
  });

  return (
    <Dialog id={CATEGORY_DIALOG_ID}>
      <DialogBody>
        <h3 class="text-lg font-bold">New Category</h3>
        <p class="py-4">Press ESC key or click the button below to close</p>
        <CategoryForm form={form} action={action} />
        <div class="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <div class="flex gap-2">
              <button class="btn btn-warning">Close</button>
              <button
                class="btn btn-success"
                form={CATEGORY_FORM_ID}
                type="submit"
              >
                {form.submitting ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </DialogBody>
    </Dialog>
  );
});
