import type { NoSerialize } from "@builder.io/qwik";
import { noSerialize, useStore, useVisibleTask$ } from "@builder.io/qwik";
import type {
  ColumnPinningState,
  PaginationState,
  RowSelectionState,
  SortingState,
  Table,
} from "@tanstack/table-core";
import {
  createTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/table-core";
import type { TableHookColumns, TableHookData } from "../../../types";
import { DEFAULT_PAGE_SIZE } from "~/constants/defaults";

type TableState = {
  sorting: SortingState;
  pagination: PaginationState;
  columnPinning: ColumnPinningState;
  globalFilter: string;
  rowSelection: RowSelectionState;
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
        // @ts-ignore
        const updated = newState(state);

        state.sorting = updated.sorting;
        state.pagination = updated.pagination;
        state.columnPinning = updated.columnPinning;
        state.globalFilter = updated.globalFilter;
        state.rowSelection = updated.rowSelection;
      },
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      enableGlobalFilter: true,
      onGlobalFilterChange: (value) => {
        state.globalFilter = value;
      },
      onRowSelectionChange: (newSelection) => {
        // @ts-ignore
        const updated = newSelection(state.rowSelection);

        state.rowSelection = updated;
      },
    }),
  );

const initialState: TableState = {
  sorting: [],
  pagination: { pageIndex: 0, pageSize: DEFAULT_PAGE_SIZE },
  columnPinning: { left: [], right: [] },
  globalFilter: "",
  rowSelection: {},
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
