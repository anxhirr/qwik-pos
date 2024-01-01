import { $, component$, useSignal } from "@builder.io/qwik";
import { routeAction$, routeLoader$ } from "@builder.io/qwik-city";
import type { Order } from "@prisma/client";
import {
  createTable,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/table-core";
import { DeleteEntityConfirmDialog } from "~/components/dialogs/shared/DeleteEntityConfirmDialog";
import { TableRowActions } from "~/components/table/actions/base";
import { columnsOrder } from "~/components/table/columns/order";
import { ENTITY } from "~/constants/enum";
import { getAllOrders } from "~/lib/queries/orders";
import { prisma } from "~/routes/plugin@auth";
import { getSessionSS } from "~/utils/auth";

const useTable = (data: Order[]) =>
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
    onStateChange: (newState) => console.log(newState),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

export const useLoader = routeLoader$(async (event) => {
  const session = getSessionSS(event);
  const data = await getAllOrders(session.shopId);

  return data;
});

//TODO: maybe add types?
export const useDeleteAction = routeAction$(async (data, { fail }) => {
  const { id } = data;
  if (!id || typeof id !== "string") {
    fail(500, {
      message: "id is missing",
    });
    return;
  }

  const result = await prisma.order.delete({ where: { id } });
  console.log("result", result);

  return {
    status: 200,
    message: "Item deleted successfully",
  };
});

export default component$(() => {
  const data = useLoader();
  const deleteOrder = useDeleteAction();
  const table = useTable(data.value);
  const { nextPage } = table;
  const showConfirmDialog = useSignal<boolean>(false);
  const confirmDialogEntityId = useSignal<string>("");

  const goToNextPage = $(nextPage);

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
      <div class="join">
        <button class="btn join-item">«</button>
        <button class="btn join-item">Page 22</button>
        <button class="btn join-item" onClick$={goToNextPage}>
          »
        </button>
      </div>

      <div class="flex items-center gap-2">
        <button
          class="rounded border p-1"
          // onClick$={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          class="rounded border p-1"
          // onClick$={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          class="rounded border p-1"
          // onClick$={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          class="rounded border p-1"
          // onClick$={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
        <span class="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <span class="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            // defaultValue={table.getState().pagination.pageIndex + 1}
            // onChange={(e) => {
            //   const page = e.target.value ? Number(e.target.value) - 1 : 0;
            //   table.setPageIndex(page);
            // }}
            class="w-16 rounded border p-1"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          // onChange={(e) => {
          //   table.setPageSize(Number(e.target.value));
          // }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show
              {/* {pageSize} */}
            </option>
          ))}
        </select>
      </div>
      <div>{table.getRowModel().rows.length} Rows</div>
      <pre>{JSON.stringify(table.getState().pagination, null, 2)}</pre>

      <DeleteEntityConfirmDialog
        entity={ENTITY.ORDER}
        show={showConfirmDialog}
        hide={$(() => {
          showConfirmDialog.value = false;
        })}
        onCancel$={() => {
          showConfirmDialog.value = false;
        }}
        onConfirm$={() => {
          deleteOrder.submit({ id: confirmDialogEntityId.value });
          showConfirmDialog.value = false;
        }}
      />
    </>
  );
});
