import { $ } from "@builder.io/qwik";
import {
  CATEGORY_DIALOG_ID,
  DELETE_CATEGORY_CONFIRM_DIALOG_ID,
  DELETE_ITEM_CONFIRM_DIALOG_ID,
  ORDER_RECEIPT_DIALOG_ID,
} from "~/constants/enum";

const setDataContent = (dialogId: string, data?: object) => {
  const dialog = document.getElementById(dialogId);
  if (data) dialog?.setAttribute("data-content", JSON.stringify(data));
};

const open = (id: string, data?: object) => {
  const modal = document.getElementById(id);
  modal?.setAttribute("open", "true");

  if (data) setDataContent(id, data);
};
const close = (id: string) => {
  const modal = document.getElementById(id);
  modal?.removeAttribute("open");
};
//////////////OPEN MODALS/////////////////////
export const openCategoryModal = $((data?: object) =>
  open(CATEGORY_DIALOG_ID, data),
);
export const openReceiptModal = $((data?: object) =>
  open(ORDER_RECEIPT_DIALOG_ID, data),
);
export const openDeleteItemConfirmModal = $((data?: object) =>
  open(DELETE_ITEM_CONFIRM_DIALOG_ID, data),
);
export const openDeleteCategoryConfirmModal = $((data?: object) =>
  open(DELETE_CATEGORY_CONFIRM_DIALOG_ID, data),
);

// i want to get the data-content of the dialog without having to pass the id
// based on the closest dialog to the button that was clicked
// export const getThisDialogData = $(() => {
//   // const clickedButton = document.activeElement;
//   // const dialog = clickedButton?.closest("dialog");
//   // const data = dialog?.getAttribute("data-content");
//   // return data ? JSON.parse(data) : null;
// });

// export const getThisDialogData = $(() => {
//   const dialog = document.querySelector("dialog[open]");
//   const data = dialog?.getAttribute("data-content");
//   return data ? JSON.parse(data) : null;
// });

//////////////CLOSE MODALS/////////////////////
export const closeCategoryModal = $(() => close(CATEGORY_DIALOG_ID));
export const closeReceiptModal = $(() => close(ORDER_RECEIPT_DIALOG_ID));
export const closeDeleteItemConfirmModal = $(() =>
  close(DELETE_ITEM_CONFIRM_DIALOG_ID),
);
export const closeDeleteCategoryConfirmModal = $(() =>
  close(DELETE_CATEGORY_CONFIRM_DIALOG_ID),
);
