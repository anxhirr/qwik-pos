import { $, component$, useSignal, useStore } from "@builder.io/qwik";
import { routeAction$, routeLoader$ } from "@builder.io/qwik-city";
import type { Item } from "@prisma/client";
import type { SortingState } from "@tanstack/table-core";
import {
  createTable,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/table-core";
import { DeleteItemConfirmDialog } from "~/components/dialogs/DeleteItemConfirmDialog";
import { TableRowActions } from "~/components/table/actions/base";
import { columnsItems } from "~/components/table/columns/items";
import { getAllItems } from "~/lib/queries/items";
import { prisma } from "~/routes/plugin@auth";
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

//TODO: maybe add types?
export const useDeleteItem = routeAction$(async (item, { fail }) => {
  const { id } = item;
  if (!id || typeof id !== "string") {
    fail(500, {
      message: "id is missing",
    });
    return;
  }

  const result = await prisma.item.delete({ where: { id } });
  console.log("result", result);

  return {
    status: 200,
    message: "Item deleted successfully",
  };
});

export default component$(() => {
  const state = useStore<{ sorting: SortingState }>({
    sorting: [],
  });
  const items = useItemsLoader();
  const deleteItem = useDeleteItem();
  const table = useTable(state, items.value);
  const showConfirmDialog = useSignal<boolean>(false);
  const confirmDialogEntityId = useSignal<string>("");

  return (
    <>
      <table class="table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(({ column }) => {
                const id = column.id;
                return <th key={id}>{column.columnDef.header}</th>;
              })}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id} class="hover">
                {row.getAllCells().map((cell) => (
                  <td key={cell.id}>{cell.getValue<string>()}</td>
                ))}
                <td>
                  <TableRowActions
                    entity="items"
                    entityId={row.original.id}
                    onDelete$={(entityId) => {
                      showConfirmDialog.value = true;
                      confirmDialogEntityId.value = entityId;
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot></tfoot>
      </table>
      <DeleteItemConfirmDialog
        show={showConfirmDialog}
        hide={$(() => {
          showConfirmDialog.value = false;
        })}
        onCancel$={() => {
          showConfirmDialog.value = false;
        }}
        onConfirm$={() => {
          deleteItem.submit({ id: confirmDialogEntityId.value });
          showConfirmDialog.value = false;
        }}
      />
    </>
  );
});
