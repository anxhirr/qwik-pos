import { component$ } from "@builder.io/qwik";
import type { Entity } from "../../../../types";
import { IndeterminateCheckbox } from "./base";

type Props = {
  entity: Entity;
  entityId: string;
};

export const TableRowCheckBox = component$<Props>(({ entity, entityId }) => {
  console.log("entity", entity);
  console.log("entityId", entityId);

  return (
    <td>
      <IndeterminateCheckbox />
    </td>
  );
});
