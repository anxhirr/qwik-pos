import type { Item } from "@prisma/client";
import { createColumnHelper } from "@tanstack/table-core";
import { renderBoolean } from "~/utils/table";

const columnHelper = createColumnHelper<Item>();
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
  columnHelper.accessor("active", {
    header: "Active",
    cell: (item) => renderBoolean(item.getValue()),
  }),
  columnHelper.accessor("favorite", {
    header: "Favorite",
    cell: (item) => renderBoolean(item.getValue()),
  }),
  columnHelper.accessor("description", {
    header: "Description",
  }),
];
