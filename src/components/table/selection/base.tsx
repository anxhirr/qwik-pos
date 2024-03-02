import { component$ } from "@builder.io/qwik";

type CheckBoxProps = {};

export const IndeterminateCheckbox = component$<CheckBoxProps>(() => {
  return <input type="checkbox" class="checkbox" />;
});
