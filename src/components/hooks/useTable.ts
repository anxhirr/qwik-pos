import type { NoSerialize } from "@builder.io/qwik";
import { noSerialize, useStore, useVisibleTask$ } from "@builder.io/qwik";
import type { Order } from "@prisma/client";
import {
  createTable,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/table-core";
import { columnsOrder } from "../table/columns/order";
import type { AvailableTables } from "../../../types";

// TODO: make this a generic hook, not only for orders
const createUnSeralizedTable = (data: Order[]) =>
  noSerialize(
    createTable({
      columns: columnsOrder,
      data,
      state: {
        columnPinning: { left: [], right: [] },
        pagination: {
          pageSize: 5,
          pageIndex: 0,
        },
      },
      renderFallbackValue: "fallback",
      onStateChange: (newState) => console.log("newState", newState),
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
    }),
  );

export const useTable = (data: Order[]) => {
  const table = useStore<{
    instance: NoSerialize<AvailableTables>;
  }>({
    instance: createUnSeralizedTable(data),
  });

  useVisibleTask$(() => {
    table.instance = createUnSeralizedTable(data);
  });

  return table;
};
