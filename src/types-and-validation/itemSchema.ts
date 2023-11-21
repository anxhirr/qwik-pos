import { type Input, boolean, minLength, object, string } from "valibot";

export const ItemSchema = object({
  name: string([minLength(1, "Please enter name.")]),
  unit: string([minLength(1, "Please enter unit.")]),
  category: string(),
  barcode: string(),
  code: string(),
  description: string(),
  active: boolean(),
  favorite: boolean(),
});

export type ItemFormType = Input<typeof ItemSchema>;
