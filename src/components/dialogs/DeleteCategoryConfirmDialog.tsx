import { component$ } from "@builder.io/qwik";
import { DELETE_CATEGORY_CONFIRM_DIALOG_ID } from "~/constants/enum";
import { ConfirmDialogBase } from ".";
import type { ConfirmDialogProps } from "../../../types";

export const DeleteCategoryConfirmDialog = component$<ConfirmDialogProps>(
  ({ show, hide, onConfirm$, onCancel$ }) => {
    return (
      <ConfirmDialogBase
        id={DELETE_CATEGORY_CONFIRM_DIALOG_ID}
        title="Delete Category"
        confirmText="Are you sure you want to delete this category?"
        onConfirm$={onConfirm$}
        onCancel$={onCancel$}
        show={show}
        hide={hide}
      />
    );
  },
);
