import type { NoSerialize } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import type { AvailableTables, Entity } from "../../../../types";
import { IndeterminateCheckbox } from "./base";

type Props = {
  entity: Entity;
  table: NoSerialize<AvailableTables>;
};

export const TableHeaderCheckBox = component$<Props>(({ table }) => {
  return (
    <th>
      <IndeterminateCheckbox
        checked={true}
        onChange$={(e) => {
          console.log("e", e);
          table?.getToggleAllPageRowsSelectedHandler();
        }}
      />
    </th>
  );
});
