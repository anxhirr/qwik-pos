import { type Input, object, string, array, number, minLength } from "valibot";

export const OrderSchema = object({
  // shopId: string([minLength(1, "ShopId is missing.")]),
  // userId: string([minLength(1, "UserId is missing.")]),
  // status: string(),
  // layout: string(),
  docNo: number(),
  date: string(),
  currency: string([minLength(1, "Choose a currency.")]),
  customer: object({
    name: string([minLength(1, "Customer is missing.")]),
    // id: string(),
  }),
  exchangeRate: number(),
  payment: object({
    method: string([minLength(1, "Please select a payment method.")]),
    // amount: number(),
    // currency: string(),
  }),
  discount: object({
    amount: number(),
    type: string(), // TODO: enum
  }),
  notes: string(),
  items: array(
    object({
      // id: string(),
      name: string([minLength(1, "Item name is missing.")]),
      unit: string([minLength(1, "Unit is missing.")]),
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
