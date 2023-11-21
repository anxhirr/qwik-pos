import { $ } from "@builder.io/qwik";
import { CATEGORY_DIALOG_ID } from "~/constants/enum";

export const openCategoryModal = $(() => {
  const modal = document.getElementById(CATEGORY_DIALOG_ID);
  modal?.setAttribute("open", "true");
});
