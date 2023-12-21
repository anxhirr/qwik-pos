import { type Input, object, string, minLength, boolean } from "valibot";

export const OrderPrefSchema = object({
  currency: string([minLength(1, "Choose a currency.")]),
  paymentMethod: string([minLength(1, "Choose payment method.")]),
  shouldPrint: boolean(),
});

export type OrderPrefFormType = Input<typeof OrderPrefSchema>;
