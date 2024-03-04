import type { NoSerialize } from "@builder.io/qwik";
import { noSerialize, useStore, useVisibleTask$ } from "@builder.io/qwik";
import type {
  ColumnPinningState,
  PaginationState,
  SortingState,
  Table,
} from "@tanstack/table-core";
import {
  createTable,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/table-core";
import type { TableHookColumns, TableHookData } from "../../../types";

type TableState = {
  sorting: SortingState;
  pagination: PaginationState;
  columnPinning: ColumnPinningState;
};

const createUnSeralizedTable = <T>(
  data: TableHookData<T>,
  columns: TableHookColumns<T>,
  state: TableState,
) =>
  noSerialize(
    createTable({
      columns,
      data: data.value,
      state: state,
      renderFallbackValue: "fallback",
      onStateChange: (newState) => {
        // TODO:this is working but seems tricky, might check again later
        state.sorting = newState(state).sorting;
        state.pagination = newState(state).pagination;
        // state.columnPinning = newState(state).columnPinning;
      },
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
    }),
  );

const initialState: TableState = {
  sorting: [],
  pagination: { pageIndex: 0, pageSize: 5 },
  columnPinning: { left: [], right: [] },
};

export const useTable = <T>(
  data: TableHookData<T>,
  columns: TableHookColumns<T>,
) => {
  const table = useStore<{
    instance: NoSerialize<Table<T>>;
    state: TableState;
  }>({
    instance: createUnSeralizedTable<T>(data, columns, initialState),
    state: initialState,
  });

  useVisibleTask$(({ track }) => {
    track(data);
    table.instance = createUnSeralizedTable<T>(data, columns, table.state);
  });

  return table;
};
