import { type Input, object, string, boolean } from "valibot";

export const OrderPrefSchema = object({
  currency: string(),
  paymentMethod: string(),
  shouldPrint: boolean(),
  printFormat: string(),
});

export type OrderPrefFormType = Input<typeof OrderPrefSchema>;
