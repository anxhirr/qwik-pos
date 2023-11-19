import type { Input } from "valibot";
import { object, string } from "valibot";

export const CategorySchema = object({
  type: string(),
  name: string(),
  color: string(),
});

export type CategoryForm = Input<typeof CategorySchema>;
