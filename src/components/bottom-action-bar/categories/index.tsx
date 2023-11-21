import { component$ } from "@builder.io/qwik";
import { IcRoundPlus } from "~/components/icons";
import { openCategoryModal } from "~/triggers/dialogs";

export const CategoriesBActionBar = component$(() => {
  return (
    <div class="navbar fixed bottom-0 right-0 bg-base-100">
      <div class="navbar-start"></div>
      <div class="navbar-center"></div>
      <div class="navbar-end">
        <button class="btn btn-secondary" onClick$={openCategoryModal}>
          <IcRoundPlus />
          New Category
        </button>
      </div>
    </div>
  );
});
