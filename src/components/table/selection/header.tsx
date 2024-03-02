import { component$ } from "@builder.io/qwik";
import type { Entity } from "../../../../types";
import { IndeterminateCheckbox } from "./base";

type Props = {
  entity: Entity;
};

export const TableHeaderCheckBox = component$<Props>(({ entity }) => {
  console.log("entity", entity);

  return (
    <th>
      <IndeterminateCheckbox />
    </th>
  );
});
