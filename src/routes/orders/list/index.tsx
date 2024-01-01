import { $, component$, useSignal } from "@builder.io/qwik";
import { routeAction$, routeLoader$ } from "@builder.io/qwik-city";
import type { Order } from "@prisma/client";
import { createTable, getCoreRowModel } from "@tanstack/table-core";
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
    },
    renderFallbackValue: "fallback",
    onStateChange: (newState) => console.log(newState),
    getCoreRowModel: getCoreRowModel(),
  });

export const useLoader = routeLoader$(async (event) => {
  const session = getSessionSS(event);
  const items = await getAllOrders(session.shopId);

  return items;
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
