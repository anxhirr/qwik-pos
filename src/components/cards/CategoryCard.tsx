import { $, component$, useSignal } from "@builder.io/qwik";
import type { Category } from "@prisma/client";
import { IcRoundDelete, IcRoundModeEdit } from "../icons";
import { DeleteCategoryConfirmDialog } from "../dialogs";

type Props = {
  data: Category;
  handleDelete$: () => void;
};

export const CategoryCard = component$<Props>(({ data, handleDelete$ }) => {
  const showConfirmDialog = useSignal(false);
  return (
    <div class="card h-full max-w-xs bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">
          {data.name}
          <div class="badge badge-secondary">{data.type}</div>
        </h2>
      </div>
      <div class="card-actions justify-end">
        <button
          class="btn btn-primary"
          onClick$={() => (showConfirmDialog.value = true)}
        >
          <IcRoundModeEdit />
          Edit
        </button>
        <button
          class="btn btn-error"
          onClick$={() => (showConfirmDialog.value = true)}
        >
          <IcRoundDelete />
          Delete
        </button>
      </div>
      <DeleteCategoryConfirmDialog
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
});
