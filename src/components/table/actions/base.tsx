import { $, component$, useSignal } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { Button } from "~/components/buttons";
import { DeleteIcon, EditIcon } from "~/components/icons";
import type { Entity } from "../../../../types";
import { DeleteEntityConfirmDialog } from "~/components/dialogs/shared/DeleteEntityConfirmDialog";

type Props = {
  entity: Entity;
  entityId: string;
  onDelete$: (entityId: string) => void;
  onDeleteConfirm$: (entityId: string) => void;
  showConfirmDialogOnDelete?: boolean;
};

export const TableRowActions = component$<Props>(
  ({
    entity = "ITEM",
    entityId,
    onDelete$,
    onDeleteConfirm$,
    showConfirmDialogOnDelete = true,
  }) => {
    const navigate = useNavigate();
    const showConfirmDialog = useSignal<boolean>(false);

    const ACTION_BUTTONS = [
      {
        Icon: EditIcon,
        id: "edit",
        onClick$: $((id: string) => navigate(`/${entity}/update/${id}`)),
        tooltipText: "Edit",
      },
      {
        Icon: DeleteIcon,
        id: "delete",
        onClick$: $(() => {
          onDelete$(entityId);
          if (showConfirmDialogOnDelete) showConfirmDialog.value = true;
        }),
        tooltipText: "Delete",
      },
    ];

    return (
      <>
        <div class="flex gap-2">
          {ACTION_BUTTONS.map(({ onClick$, id, Icon, tooltipText }) => {
            return (
              <Button
                key={id}
                onClick$={() => onClick$(entityId)}
                variant="secondary"
                Icon={Icon}
                size="sm"
                tooltipText={tooltipText}
              />
            );
          })}
        </div>

        <DeleteEntityConfirmDialog
          entity={entity}
          show={showConfirmDialog}
          hide={$(() => {
            showConfirmDialog.value = false;
          })}
          onCancel$={() => {
            showConfirmDialog.value = false;
          }}
          onConfirm$={() => {
            showConfirmDialog.value = false;
            onDeleteConfirm$(entityId);
          }}
        />
      </>
    );
  },
);
