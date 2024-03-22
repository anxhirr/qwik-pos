import { component$, useTask$ } from "@builder.io/qwik";
import { CategoryForm } from "../forms/category/CategoryForm";
import type { ResponseData } from "@modular-forms/qwik";
import { setValues, useFormStore, valiForm$ } from "@modular-forms/qwik";
import type { CategoryFormType } from "~/types-and-validation/categorySchema";
import { CategorySchema } from "~/types-and-validation/categorySchema";
import { CATEGORY_DIALOG_ID, CATEGORY_FORM_ID } from "~/constants/enum";
import { Dialog, DialogBody, DialogFooter } from ".";
import type { CRUDactions, DialogProps, FromStoreAction } from "../../../types";
import { Button } from "../buttons/base";
import {
  CRUD_ACTIONS_ICON,
  CRUD_ACTIONS_LOADING,
  CRUD_ACTIONS_TEXT,
} from "~/constants/maps";

interface CategoryDialogProps extends DialogProps {
  formData: CategoryFormType;
  action: FromStoreAction<CategoryFormType>;
  mode: CRUDactions;
}

export const CategoryDialog = component$<CategoryDialogProps>(
  ({ show, hide, formData, action, mode }) => {
    const form = useFormStore<CategoryFormType, ResponseData>({
      loader: {
        value: formData,
      },
      validate: valiForm$(CategorySchema),
      fieldArrays: ["types"],
    });

    useTask$(({ track }) => {
      track(() => formData);

      setValues(form, formData);
    });

    return (
      <Dialog
        id={CATEGORY_DIALOG_ID}
        show={show}
        hide={hide}
        title={`${CRUD_ACTIONS_TEXT.get(mode)} Category`}
      >
        <DialogBody>
          <CategoryForm form={form} action={action} />
        </DialogBody>
        <DialogFooter hide={hide}>
          <Button
            text={CRUD_ACTIONS_TEXT.get(mode)}
            isLoading={form.submitting}
            loadingText={`${CRUD_ACTIONS_LOADING.get(mode)}...`}
            form={CATEGORY_FORM_ID}
            type="submit"
            variant="success"
            Icon={CRUD_ACTIONS_ICON.get(mode)}
          />
        </DialogFooter>
      </Dialog>
    );
  },
);
