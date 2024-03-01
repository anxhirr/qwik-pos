import { $, component$, useSignal } from "@builder.io/qwik";
import type { Category } from "@prisma/client";
import { DeleteIcon, EditIcon } from "../icons";
import { Button } from "../buttons/base";
import { DeleteEntityConfirmDialog } from "../dialogs/shared/DeleteEntityConfirmDialog";

type Props = {
  data: Category;
  onEdit$: () => void;
  onDeleteConfirm$: (entityId: string) => void;
  onDelete$?: (entityId: string) => void;
};

export const CategoryCard = component$<Props>(
  ({ data, onEdit$, onDelete$, onDeleteConfirm$ }) => {
    const showConfirmDialog = useSignal(false);
    return (
      <div class="card h-full max-w-xs bg-secondary shadow-xl">
        <div class="card-body">
          <h2 class="card-title">
            {data.name}
            <div class="badge badge-accent">{data.type}</div>
          </h2>
        </div>
        <div class="card-actions justify-end">
          <Button
            variant="ghost"
            onClick$={onEdit$}
            text="Edit"
            Icon={EditIcon}
          />
          <Button
            variant="ghost"
            onClick$={() => {
              onDelete$?.(data.id);
              showConfirmDialog.value = true;
            }}
            text="Delete"
            Icon={DeleteIcon}
          />
        </div>
        <DeleteEntityConfirmDialog
          entity="CATEGORY"
          show={showConfirmDialog}
          onConfirm$={() => {
            onDeleteConfirm$(data.id);
            showConfirmDialog.value = false;
          }}
          onCancel$={() => {
            showConfirmDialog.value = false;
          }}
          hide={$(() => {
            showConfirmDialog.value = false;
          })}
        />
      </div>
    );
  },
);
