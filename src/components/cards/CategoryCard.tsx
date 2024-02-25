import { $, component$, useSignal } from "@builder.io/qwik";
import type { Category } from "@prisma/client";
import { DeleteIcon, EditIcon } from "../icons";
import { Button } from "../buttons/base";
import { DeleteEntityConfirmDialog } from "../dialogs/shared/DeleteEntityConfirmDialog";

type Props = {
  data: Category;
  handleDelete$: () => void;
  handleEdit$: () => void;
};

export const CategoryCard = component$<Props>(
  ({ data, handleDelete$, handleEdit$ }) => {
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
            onClick$={handleEdit$}
            text="Edit"
            Icon={EditIcon}
          />
          <Button
            variant="ghost"
            onClick$={handleEdit$}
            text="Delete"
            Icon={DeleteIcon}
          />
        </div>
        <DeleteEntityConfirmDialog
          entity="CATEGORY"
          show={showConfirmDialog}
          onConfirm$={handleDelete$}
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
