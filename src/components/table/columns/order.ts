import { $ } from "@builder.io/qwik";
import type { Order } from "@prisma/client";
import type { CellContext } from "@tanstack/table-core";
import { createColumnHelper } from "@tanstack/table-core";

const columnHelper = createColumnHelper<Order>();
export const columnsOrder = [
  columnHelper.accessor("docNo", {
    header: "Doc No",
  }),
  columnHelper.accessor("currency", {
    header: "Currency",
  }),
  columnHelper.accessor("customerName", {
    header: "Customer Name",
  }),
  columnHelper.accessor("paymentMethod", {
    header: "Payment Method",
  }),
  columnHelper.accessor("date", {
    header: "Date",
    cell: $(
      // TODO: check why when using dollar sign, the type is not inferred
      (order: CellContext<Order, Date>) => order.getValue().toDateString(),
    ),
  }),
];
