import type { Input } from "valibot";
import { array, minLength, object, string } from "valibot";

export const CategorySchema = object({
  types: array(string([minLength(1, "Please select type.")])),
  name: string([minLength(1, "Please enter name.")]),
  color: string(),
});

export type CategoryFormType = Input<typeof CategorySchema>;
