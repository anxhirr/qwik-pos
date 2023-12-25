import { component$ } from "@builder.io/qwik";
import { DELETE_ITEM_CONFIRM_DIALOG_ID } from "~/constants/enum";
import { ConfirmDialogBase } from ".";

export const DeleteItemConfirmDialog = component$(() => {
  return (
    <ConfirmDialogBase
      id={DELETE_ITEM_CONFIRM_DIALOG_ID}
      title="Delete Item"
      confirmText="Are you sure you want to delete this item?"
      onConfirm$={() => console.log("confirm")}
      onCancel$={() => console.log("cancel")}
    />
  );
});
