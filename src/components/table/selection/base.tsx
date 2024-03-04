import type { QwikChangeEvent } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";

type CheckBoxProps = {
  checked: boolean;
  onChange$: (e: QwikChangeEvent<HTMLInputElement>) => void;
};

export const IndeterminateCheckbox = component$<CheckBoxProps>(
  ({ checked, onChange$ }) => {
    return (
      <input
        type="checkbox"
        class="checkbox checkbox-sm"
        checked={checked}
        onChange$={onChange$}
      />
    );
  },
);
