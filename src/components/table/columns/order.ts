import type { Order } from "@prisma/client";
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
    cell: (order) => order.getValue().toDateString(),
  }),
];
