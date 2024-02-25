import { $ } from "@builder.io/qwik";
import type { CellContext } from "@tanstack/table-core";
import { createColumnHelper } from "@tanstack/table-core";
import type { PrismaItemWithPrice } from "~/types-and-validation/itemSchema";
import { renderBoolean } from "~/utils/table";

type Cell<T> = CellContext<PrismaItemWithPrice, T>;
const columnHelper = createColumnHelper<PrismaItemWithPrice>();
export const columnsItems = [
  columnHelper.accessor("name", {
    header: "Name",
  }),
  columnHelper.accessor("unit", {
    header: "Unit",
  }),
  columnHelper.accessor("barcode", {
    header: "Barcode",
  }),
  columnHelper.accessor("code", {
    header: "Code",
  }),
  columnHelper.accessor("priceRules", {
    header: "Active Price",
    cell: $((item: Cell<PrismaItemWithPrice["priceRules"]>) => {
      const price = item.getValue().find(
        (
          rule, // TODO: check if this logic is correct
        ) =>
          new Date(rule.start) < new Date() && new Date(rule.end) > new Date(),
      );
      return price?.price || "No active price";
    }),
  }),
  columnHelper.accessor("active", {
    header: "Active",
    cell: $((item: Cell<boolean>) => renderBoolean(item.getValue())),
  }),
  columnHelper.accessor("favorite", {
    header: "Favorite",
    cell: $((item: Cell<boolean>) => renderBoolean(item.getValue())),
  }),
  columnHelper.accessor("description", {
    header: "Description",
  }),
];
