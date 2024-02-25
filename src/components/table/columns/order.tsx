import { $ } from "@builder.io/qwik";
import type { Order } from "@prisma/client";
import type { CellContext } from "@tanstack/table-core";
import { createColumnHelper } from "@tanstack/table-core";
import { Tooltip } from "~/components/tooltip/base";

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
    cell: $((order: CellContext<Order, Date>) => (
      <Tooltip text={order.getValue().toLocaleTimeString()}>
        <div>{order.getValue().toLocaleDateString()}</div>
      </Tooltip>
    )),
  }),
];
