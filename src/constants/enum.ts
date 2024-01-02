// export const CATEGORY_ENUM = {
//   ITEM: "ITEM",
//   CUSTOMER: "CUSTOMER",
// } as const;
export const CATEGORY_ENUM = ["ITEM", "CUSTOMER"] as const;

//DIALOG IDS
export const CATEGORY_DIALOG_ID = "CATEGORY_DIALOG_ID";

export const ORDER_RECEIPT_DIALOG_ID = "ORDER_RECEIPT_DIALOG_ID";

export const DELETE_ITEM_CONFIRM_DIALOG_ID = "DELETE_ITEM_CONFIRM_DIALOG_ID";
export const DELETE_CATEGORY_CONFIRM_DIALOG_ID =
  "DELETE_CATEGORY_CONFIRM_DIALOG_ID";

//FORMS IDS
export const CATEGORY_FORM_ID = "CATEGORY_FORM_ID";
export const SHOP_FORM_ID = "SHOP_FORM_ID";
export const ITEM_FORM_ID = "ITEM_FORM_ID";
export const ORDER_FORM_ID = "ORDER_FORM_ID";

export const CURRENCIES = ["ALL", "EUR", "USD"] as const;

export const PAYMENT_METHODS = ["CASH", "CARD", "BANK"] as const;

export const PRINT_FORMATS = ["80mm", "58mm", "A4", "A5"] as const;

export const DISCOUNT_TYPES = ["PERCENTAGE", "AMOUNT"] as const;

export const ENTITY = {
  ITEM: "ITEM",
  CUSTOMER: "CUSTOMER",
  ORDER: "ORDER",
  CATEGORY: "CATEGORY",
} as const;

export const BOTTOM_NAVBAR_SLOTS = {
  START: "START",
  CENTER: "CENTER",
  END: "END",
} as const;
