import type { NoSerialize } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import { tableFlexRender } from "~/utils/table";
import { TableRowActions } from "./actions/base";
import type { AvailableTables, Entity } from "../../../types";

type Props = {
  table: NoSerialize<AvailableTables>;
  entity: Entity;
  onDelete$: (entityId: string) => void;
  onDeleteConfirm$: (entityId: string) => void;
  showConfirmDialogOnDelete?: boolean;
};

export const TableBase = component$<Props>(
  ({
    table,
    entity,
    onDelete$,
    onDeleteConfirm$,
    showConfirmDialogOnDelete = true,
  }) => {
    return (
      <table class="table">
        <thead>
          {table?.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(({ column }) => {
                const id = column.id;
                return <th key={id}>{column.columnDef.header}</th>;
              })}
            </tr>
          ))}
        </thead>

        <tbody>
          {table?.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id} class="hover">
                {row.getAllCells().map((cell) => (
                  <td key={cell.id}>
                    {tableFlexRender(
                      cell.column.columnDef.cell,
                      cell.getContext(),
                    )}
                  </td>
                ))}
                <td>
                  <TableRowActions
                    entity={entity}
                    entityId={row.original.id}
                    onDelete$={onDelete$}
                    onDeleteConfirm$={onDeleteConfirm$}
                    showConfirmDialogOnDelete={showConfirmDialogOnDelete}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot></tfoot>
      </table>
    );
  },
);