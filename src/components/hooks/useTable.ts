import type { NoSerialize } from "@builder.io/qwik";
import { noSerialize, useStore, useVisibleTask$ } from "@builder.io/qwik";
import type { Table } from "@tanstack/table-core";
import {
  createTable,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/table-core";
import type { TableHookColumns, TableHookData } from "../../../types";

const createUnSeralizedTable = <T>(
  data: TableHookData<T>,
  columns: TableHookColumns<T>,
) =>
  noSerialize(
    createTable({
      columns,
      data: data.value,
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

export const useTable = <T>(
  data: TableHookData<T>,
  columns: TableHookColumns<T>,
) => {
  const table = useStore<{
    instance: NoSerialize<Table<T>>;
  }>({
    instance: createUnSeralizedTable<T>(data, columns),
  });

  useVisibleTask$(({ track }) => {
    track(data);
    table.instance = createUnSeralizedTable<T>(data, columns);
  });

  return table;
};
