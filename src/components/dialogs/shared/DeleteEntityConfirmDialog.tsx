import { component$ } from "@builder.io/qwik";
import { DELETE_ITEM_CONFIRM_DIALOG_ID } from "~/constants/enum";
import { ConfirmDialogBase } from "..";
import type { ConfirmDialogProps, Entity } from "../../../../types";
import { ENTITY_PLURAL_MAP } from "~/constants/maps";

interface Props extends ConfirmDialogProps {
  entity: Entity;
  isBulk?: boolean;
}

export const DeleteEntityConfirmDialog = component$<Props>(
  ({ show, entity, hide, onConfirm$, onCancel$, isBulk }) => {
    const entityName = isBulk
      ? ENTITY_PLURAL_MAP.get(entity)
      : entity.toLowerCase();
    return (
      <ConfirmDialogBase
        id={DELETE_ITEM_CONFIRM_DIALOG_ID}
        title={`Delete ${entityName}`}
        confirmText={`Are you sure you want to delete ${
          isBulk ? "these" : "this"
        } ${entityName}?`}
        onConfirm$={onConfirm$}
        onCancel$={onCancel$}
        show={show}
        hide={hide}
      />
    );
  },
);
