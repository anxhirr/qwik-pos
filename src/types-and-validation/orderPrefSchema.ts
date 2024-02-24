import { type Input, object, string, boolean, number } from "valibot";

export const OrderPrefSchema = object({
  currency: string(),
  paymentMethod: string(),
  shouldPrint: boolean(),
  printFormat: string(),
  docNo: number(),
});

export type OrderPrefFormType = Input<typeof OrderPrefSchema>;
