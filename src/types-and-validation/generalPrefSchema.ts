import { type Input, object, string } from "valibot";

export const GeneralPrefSchema = object({
  language: string(),
});

export type GeneralPrefFormType = Input<typeof GeneralPrefSchema>;
