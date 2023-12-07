import type { Input } from "valibot";
import { minLength, object, string } from "valibot";

export const ShopSchema = object({
  address: string([minLength(1, "Please enter your address.")]),
  baseCurrency: string([minLength(1, "Please enter your base currency.")]),
  city: string([minLength(1, "Please enter your city.")]),
  description: string([minLength(1, "Please enter your description.")]),
  email: string([minLength(1, "Please enter your email.")]),
  name: string([minLength(1, "Please enter your name.")]),
  // ownerId: string([minLength(1, "Please enter your ownerId.")]),
  phone: string([minLength(1, "Please enter your phone.")]),
});

export type ShopFormType = Input<typeof ShopSchema>;
