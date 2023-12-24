import type { Item } from "@prisma/client";
import { createColumnHelper } from "@tanstack/table-core";

const columnHelper = createColumnHelper<Item>();
export const columnsItems = [
  columnHelper.accessor("name", {
    header: "Name",
  }),
  columnHelper.accessor("unit", {
    header: "Unit",
  }),
  columnHelper.accessor("description", {
    header: "Description",
  }),
];
