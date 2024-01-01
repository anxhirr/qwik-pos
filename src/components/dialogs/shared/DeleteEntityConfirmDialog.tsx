import { component$ } from "@builder.io/qwik";
import { DELETE_ITEM_CONFIRM_DIALOG_ID } from "~/constants/enum";
import { ConfirmDialogBase } from "..";
import type { ConfirmDialogProps, Entity } from "../../../../types";

interface Props extends ConfirmDialogProps {
  entity: Entity;
}

export const DeleteEntityConfirmDialog = component$<Props>(
  ({ show, entity, hide, onConfirm$, onCancel$ }) => {
    return (
      <ConfirmDialogBase
        id={DELETE_ITEM_CONFIRM_DIALOG_ID}
        title={`Delete ${entity}`}
        confirmText={`Are you sure you want to delete this ${entity}?`}
        onConfirm$={onConfirm$}
        onCancel$={onCancel$}
        show={show}
        hide={hide}
      />
    );
  },
);
