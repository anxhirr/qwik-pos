import {
  type Input,
  // boolean,
  // minLength,
  object,
  string,
  array,
  number,
} from "valibot";

export const OrderSchema = object({
  // shopId: string([minLength(1, "ShopId is missing.")]),
  // userId: string([minLength(1, "UserId is missing.")]),
  date: string(),
  currency: string(),
  customer: object({
    name: string(),
    id: string(),
  }),
  exchangeRate: number(),
  customerId: string(),
  // status: string(),
  payment: object({
    method: string(), // TODO: enum
    amount: number(),
    currency: string(),
  }),
  discount: object({
    amount: number(),
    type: string(), // TODO: enum
  }),
  notes: string(),
  docNo: string(),
  layout: string(),
  items: array(
    object({
      id: string(),
      name: string(),
      unit: string(),
      quantity: number(),
      unitPrice: number(),
      unitPriceWithTax: number(),
      // taxAmount: string(),
      // discountAmount: string(),
      // price: string(),
      // finalPrice: string(),
      // total: string(),
      // merged: boolean(),
    }),
  ),
}); // TODO: not finished yet

export type OrderFormType = Input<typeof OrderSchema>;
