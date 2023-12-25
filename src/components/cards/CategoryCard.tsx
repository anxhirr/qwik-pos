import { component$ } from "@builder.io/qwik";
import type { Category } from "@prisma/client";
import { IcRoundDelete, IcRoundModeEdit } from "../icons";
import {
  openCategoryModal,
  openDeleteCategoryConfirmModal,
} from "~/triggers/dialogs";
import { DeleteCategoryConfirmDialog } from "../dialogs/DeleteCategoryConfirmDialog";

type Props = {
  data: Category;
};
export const CategoryCard = component$<Props>(({ data }) => {
  return (
    <div class="card h-full max-w-xs bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">
          {data.name}
          <div class="badge badge-secondary">{data.type}</div>
        </h2>
      </div>
      <div class="card-actions justify-end">
        <button class="btn btn-primary" onClick$={openCategoryModal}>
          <IcRoundModeEdit />
          Edit
        </button>
        <button class="btn btn-error" onClick$={openDeleteCategoryConfirmModal}>
          <IcRoundDelete />
          Delete
        </button>
      </div>
      <DeleteCategoryConfirmDialog />
    </div>
  );
});
