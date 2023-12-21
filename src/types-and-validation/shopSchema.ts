import type { Input } from "valibot";
import { minLength, object, string } from "valibot";

export const ShopSchema = object({
  address: string(),
  baseCurrency: string([minLength(1, "Please enter your base currency.")]),
  city: string(),
  description: string(),
  email: string([minLength(1, "Please enter your email.")]),
  name: string([minLength(1, "Please enter your name.")]),
  // ownerId: string([minLength(1, "Please enter your ownerId.")]),
  phone: string(),
});

export type ShopFormType = Input<typeof ShopSchema>;
