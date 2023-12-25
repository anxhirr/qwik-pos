import { $, component$, useStore } from "@builder.io/qwik";
import { routeLoader$, useNavigate } from "@builder.io/qwik-city";
import type { Item } from "@prisma/client";
import type { SortingState } from "@tanstack/table-core";
import {
  createTable,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/table-core";
import { DeleteItemConfirmDialog } from "~/components/dialogs/DeleteItemConfirmDialog";
import { IcRoundDelete, IcRoundModeEdit } from "~/components/icons";
import { columnsItems } from "~/components/table/columns/items";
import { getAllItems } from "~/lib/queries/items";
import { openDeleteItemConfirmModal } from "~/triggers/dialogs";
import { getSessionSS } from "~/utils/auth";

const useTable = (tableState: { sorting: SortingState }, data: Item[]) =>
  createTable({
    columns: columnsItems,
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

export const useItemsLoader = routeLoader$(async (event) => {
  const session = getSessionSS(event);
  const items = await getAllItems(session.shopId);

  return items;
});

export default component$(() => {
  const state = useStore<{ sorting: SortingState }>({
    sorting: [],
  });
  const navigate = useNavigate();
  const items = useItemsLoader();
  const table = useTable(state, items.value);

  const ACTION_BUTTONS = [
    {
      Icon: IcRoundModeEdit,
      id: "edit",
      onClick$: $((data: Item) => navigate(`/items/${data.id}`)),
    },
    {
      Icon: IcRoundDelete,
      id: "delete",
      onClick$: $(() => openDeleteItemConfirmModal()),
    },
  ];

  return (
    <>
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
              <td>
                <div class="flex gap-2">
                  {ACTION_BUTTONS.map(({ Icon, onClick$, id }) => {
                    const data = row.original;
                    return (
                      <button
                        key={id}
                        class="btn btn-neutral btn-sm"
                        onClick$={() => onClick$(data)}
                      >
                        {<Icon />}
                      </button>
                    );
                  })}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot></tfoot>
      </table>
      <DeleteItemConfirmDialog />
    </>
  );
});
