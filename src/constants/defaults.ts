export const PRICE_START_DATE = new Date("1111-01-01T00:00");
export const PRICE_END_DATE = new Date("2222-01-01T00:00");

export const ORDER_EMPTY_ROW = {
  name: "",
  unit: "",
  quantity: 0,
  unitPrice: 0,
  unitPriceWithTax: 0,
} as const;

export const INITIAL_ORDER_DOC_NO = 1;

export const CATEGORY_EMPTY_DATA = {
  name: "",
  type: "",
  color: "",
} as const;

export const LISTS_DEFAULT_TAKE = 100 as const;
export const LISTS_DEFAULT_SKIP = 0 as const;
