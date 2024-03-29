import type {
  Currency,
  DiscountType,
  Language,
  PageSizes,
  PaymentMethod,
  PrintFormat,
} from "~/types";
export const CATEGORY_TYPES_ENUM = ["ITEM", "CUSTOMER"] as const;

//DIALOG IDS
export const CATEGORY_DIALOG_ID = "CATEGORY_DIALOG_ID";

export const ORDER_RECEIPT_DIALOG_ID = "ORDER_RECEIPT_DIALOG_ID";

export const DELETE_ITEM_CONFIRM_DIALOG_ID = "DELETE_ITEM_CONFIRM_DIALOG_ID";
export const DELETE_CATEGORY_CONFIRM_DIALOG_ID =
  "DELETE_CATEGORY_CONFIRM_DIALOG_ID";

//FORMS IDS
export const CATEGORY_FORM_ID = "CATEGORY_FORM_ID" as const;
export const SHOP_FORM_ID = "SHOP_FORM_ID" as const;
export const ITEM_FORM_ID = "ITEM_FORM_ID" as const;
export const ORDER_FORM_ID = "ORDER_FORM_ID" as const;
export const PREF_ORDER_FORM_ID = "PREF_ORDER_FORM_ID" as const;

export const CURRENCIES: readonly Currency[] = ["ALL", "EUR", "USD"];
export const LANGUAGES: readonly Language[] = ["AL", "EN"];

export const PAGE_SIZES: readonly PageSizes[] = [10, 20, 50, 100];

export const PAYMENT_METHODS: readonly PaymentMethod[] = [
  "CASH",
  "CARD",
  "BANK",
];

export const PRINT_FORMATS: readonly PrintFormat[] = [
  "80mm",
  "58mm",
  "A4",
  "A5",
];

export const DISCOUNT_TYPES: readonly DiscountType[] = ["PERCENTAGE", "AMOUNT"];

export const BOTTOM_NAVBAR_SLOT = "BOTTOM_NAVBAR_SLOT" as const;
export const BOTTOM_NAVBAR_SLOTS = {
  START: "START",
  CENTER: "CENTER",
  END: "END",
} as const; // TODO: add types for this
