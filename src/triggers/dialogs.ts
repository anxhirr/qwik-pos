import { $ } from "@builder.io/qwik";
import { CATEGORY_DIALOG_ID, ORDER_RECEIPT_DIALOG_ID } from "~/constants/enum";

export const openCategoryModal = $(() => {
  const modal = document.getElementById(CATEGORY_DIALOG_ID);
  modal?.setAttribute("open", "true");
});
export const openReceiptModal = $(() => {
  const modal = document.getElementById(ORDER_RECEIPT_DIALOG_ID);
  modal?.setAttribute("open", "true");
});
