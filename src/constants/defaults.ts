import type { CategoryFormType, OrderFormType } from "~/types-and-validation";
import type { PageSizes } from "../../types";

export const PRICE_START_DATE = new Date("1111-01-01T00:00");
export const PRICE_END_DATE = new Date("2222-01-01T00:00");

export const ORDER_EMPTY_ROW: OrderFormType["items"][0] = {
  name: "",
  unit: "",
  quantity: 0,
  unitPrice: 0,
  unitPriceWithTax: 0,
} as const;

export const INITIAL_ORDER_DOC_NO = 1 as const;

export const CATEGORY_EMPTY_DATA: CategoryFormType = {
  name: "",
  types: [],
  color: "",
} as const;

export const LISTS_DEFAULT_TAKE = 100 as const;
export const LISTS_DEFAULT_SKIP = 0 as const;

export const DEFAULT_PAGE_SIZE: PageSizes = 10;
