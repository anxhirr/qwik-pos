import { component$ } from "@builder.io/qwik";
import { DELETE_ITEM_CONFIRM_DIALOG_ID } from "~/constants/enum";
import { ConfirmDialogBase } from ".";
import type { ConfirmDialogProps } from "../../../types";

export const DeleteItemConfirmDialog = component$<ConfirmDialogProps>(
  ({ show, hide, onConfirm$, onCancel$ }) => {
    return (
      <ConfirmDialogBase
        id={DELETE_ITEM_CONFIRM_DIALOG_ID}
        title="Delete Item"
        confirmText="Are you sure you want to delete this item?"
        onConfirm$={onConfirm$}
        onCancel$={onCancel$}
        show={show}
        hide={hide}
      />
    );
  },
);
