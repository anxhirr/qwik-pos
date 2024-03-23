import { z } from "@builder.io/qwik-city";
import { CATEGORY_TYPES_ENUM } from "~/constants/enum";

export const categorySchema = z.object({
  types: z.array(z.enum(CATEGORY_TYPES_ENUM)).min(1),
  name: z.string().min(1),
  color: z.string(),
});

export type CategoryFormType = z.infer<typeof categorySchema>;
