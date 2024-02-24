import type { Prisma } from "@prisma/client";
import {
  type Input,
  boolean,
  minLength,
  object,
  string,
  array,
  number,
  isoTimestamp,
} from "valibot";

export const ItemSchema = object({
  name: string([minLength(1, "Please enter name.")]),
  unit: string([minLength(1, "Please enter unit.")]),
  priceRules: array(
    object({
      start: string([isoTimestamp()]),
      end: string([isoTimestamp()]),
      price: number(),
    }),
  ),
  categoryIDs: array(string()),
  barcode: string(),
  code: string(),
  description: string(),
  active: boolean(),
  favorite: boolean(),
});

export type ItemFormType = Input<typeof ItemSchema>;
export type PrismaItemWithPrice = Prisma.ItemGetPayload<{
  include: {
    priceRules: true;
  };
}>;
