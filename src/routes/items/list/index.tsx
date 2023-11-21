import { component$, useStore } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { Item } from "@prisma/client";
import type { SortingState } from "@tanstack/table-core";
import {
  createTable,
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/table-core";
import { prisma } from "~/routes/plugin@auth";
import type { ItemFormType } from "~/types-and-validation/itemSchema";

export const columnHelper = createColumnHelper<Item>();
export const columns = [
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

export const useTable = (
  tableState: { sorting: SortingState },
  data: ItemFormType[],
) =>
  createTable({
    columns,
    data,
    state: {
      columnPinning: { left: [], right: [] },
      sorting: tableState.sorting,
    },
    renderFallbackValue: "fallback",
    onStateChange: (newState) => console.log(newState),
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

export const useItemsLoader = routeLoader$(async () => {
  const items = await prisma.item.findMany();

  return items;
});

export default component$(() => {
  const state = useStore<{ sorting: SortingState }>({
    sorting: [],
  });
  const items = useItemsLoader();
  const table = useTable(state, items.value);

  return (
    <table class="table">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(({ column }) => {
              const id = column.id;
              return (
                <th
                  key={id}
                  // onClick$={(e) => {
                  //   const table = useTable(state);
                  //   table.getColumn(id)?.getToggleSortingHandler?.()?.(e);
                  // }}
                >
                  {column.columnDef.header}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>

      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} class="hover">
            {row.getAllCells().map((cell) => (
              <td key={cell.id}>{cell.getValue<string>()}</td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot></tfoot>
    </table>
  );
});
