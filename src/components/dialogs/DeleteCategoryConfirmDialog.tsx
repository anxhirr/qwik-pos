import { component$ } from "@builder.io/qwik";
import { DELETE_CATEGORY_CONFIRM_DIALOG_ID } from "~/constants/enum";
import { ConfirmDialogBase } from ".";

export const DeleteCategoryConfirmDialog = component$(() => {
  return (
    <ConfirmDialogBase
      id={DELETE_CATEGORY_CONFIRM_DIALOG_ID}
      title="Delete Category"
      confirmText="Are you sure you want to delete this category?"
      onConfirm$={() => console.log("confirm")}
      onCancel$={() => console.log("cancel")}
    />
  );
});
