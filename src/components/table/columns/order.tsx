import { $ } from "@builder.io/qwik";
import type { Order } from "@prisma/client";
import type { CellContext } from "@tanstack/table-core";
import { createColumnHelper } from "@tanstack/table-core";
import { Tooltip } from "~/components/tooltip/base";
import { PAYMENT_METHOD_ICON_MAP } from "~/constants/maps";
import type { PaymentMethod } from "~/types";

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
    cell: $((order: CellContext<Order, PaymentMethod>) => {
      const Icon = PAYMENT_METHOD_ICON_MAP.get(order.getValue());
      return (
        <div class="flex-center gap-1">
          {Icon && <Icon />}
          <span>{order.getValue()}</span>
        </div>
      );
    }),
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
