import type { NoSerialize } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import type { AvailableTables, Entity } from "~/types";
import { IndeterminateCheckbox } from "./base";

type Props = {
  entity: Entity;
  entityId: string;
  rowId: string;
  table: NoSerialize<AvailableTables>;
};

export const TableRowCheckBox = component$<Props>(({ table, rowId }) => {
  return (
    <td>
      <IndeterminateCheckbox
        checked={!!table?.getRow(rowId)?.getIsSelected()}
        onChange$={() => {
          const row = table?.getRow(rowId);
          row?.toggleSelected();
        }}
      />
    </td>
  );
});
