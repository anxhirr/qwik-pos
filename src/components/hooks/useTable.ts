import type { NoSerialize } from "@builder.io/qwik";
import { noSerialize, useStore, useVisibleTask$ } from "@builder.io/qwik";
import type { ColumnDef, Table } from "@tanstack/table-core";
import {
  createTable,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/table-core";

const createUnSeralizedTable = <T>(data: T[], columns: ColumnDef<T, any>[]) =>
  noSerialize(
    createTable({
      columns,
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

export const useTable = <T>(data: T[], columns: ColumnDef<T, any>[]) => {
  const table = useStore<{
    instance: NoSerialize<Table<T>>;
  }>({
    instance: createUnSeralizedTable<T>(data, columns),
  });

  useVisibleTask$(() => {
    table.instance = createUnSeralizedTable<T>(data, columns);
  });

  return table;
};
