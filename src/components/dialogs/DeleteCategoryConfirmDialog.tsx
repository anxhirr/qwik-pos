import { component$ } from "@builder.io/qwik";
import { DELETE_CATEGORY_CONFIRM_DIALOG_ID } from "~/constants/enum";
import { ConfirmDialogBase } from ".";

type Props = {
  onConfirm$: () => void;
  onCancel$: () => void;
};
export const DeleteCategoryConfirmDialog = component$<Props>(
  ({ onConfirm$, onCancel$ }) => {
    return (
      <ConfirmDialogBase
        id={DELETE_CATEGORY_CONFIRM_DIALOG_ID}
        title="Delete Category"
        confirmText="Are you sure you want to delete this category?"
        onConfirm$={onConfirm$}
        onCancel$={onCancel$}
      />
    );
  },
);
