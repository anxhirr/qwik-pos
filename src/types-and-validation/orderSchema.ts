import { type Input, boolean, minLength, object, string, array } from "valibot";

export const OrderSchema = object({
  shopId: string([minLength(1, "ShopId is missing.")]),
  userId: string([minLength(1, "UserId is missing.")]),
  date: string(),
  currency: string(),
  customerId: string(),
  status: string(),
  payment: string(),
  discount: string(),
  notes: string(),
  docNo: string(),
  layout: string(),
  items: array(
    object({
      id: string(),
      name: string(),
      unit: string(),
      quantity: string(),
      taxAmount: string(),
      discountAmount: string(),
      price: string(),
      finalPrice: string(),
      total: string(),
      merged: boolean(),
    }),
  ),
}); // TODO: not finished yet

export type OrderFormType = Input<typeof OrderSchema>;
