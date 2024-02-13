import { component$, useTask$ } from "@builder.io/qwik";
import { CategoryForm } from "../forms/category/CategoryForm";
import type { ResponseData } from "@modular-forms/qwik";
import {
  formAction$,
  setValues,
  useFormStore,
  valiForm$,
} from "@modular-forms/qwik";
import type { CategoryFormType } from "~/types-and-validation/categorySchema";
import { CategorySchema } from "~/types-and-validation/categorySchema";
import { CATEGORY_DIALOG_ID, CATEGORY_FORM_ID } from "~/constants/enum";
import { Dialog, DialogBody, DialogFooter } from ".";
import type { DialogProps } from "../../../types";
import { Button } from "../buttons/base";
import { getSessionSS } from "~/utils/auth";
import { createCategory } from "~/lib/queries/categories";
import { CheckIcon } from "../icons";

export const useFormAction = formAction$<CategoryFormType>(
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

interface CategoryDialogProps extends DialogProps {
  formData: CategoryFormType;
}

export const CategoryDialog = component$<CategoryDialogProps>(
  ({ show, hide, formData }) => {
    const action = useFormAction();
    const form = useFormStore<CategoryFormType, ResponseData>({
      loader: {
        value: formData,
      },
      validate: valiForm$(CategorySchema),
    });

    useTask$(({ track }) => {
      track(() => formData);

      setValues(form, formData);
    });

    return (
      <Dialog
        id={CATEGORY_DIALOG_ID}
        show={show.value}
        hide={hide}
        title="Create Category"
      >
        <DialogBody>
          <CategoryForm form={form} action={action} />
        </DialogBody>
        <DialogFooter hide={hide}>
          <Button
            text="Save"
            isLoading={form.submitting}
            loadingText="Saving..."
            form={CATEGORY_FORM_ID}
            type="submit"
            variant="success"
            Icon={CheckIcon}
          />
        </DialogFooter>
      </Dialog>
    );
  },
);
