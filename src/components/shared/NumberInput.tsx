import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import clsx from "clsx";

type NumberInputProps = {
  name: string;
  value: number | undefined;
  placeholder?: string;
  class?: string;
  error?: string;
};

export const NumberInput = component$(
  ({ value, error, name, ...props }: NumberInputProps) => {
    // Update signal if value is not `NaN`
    const input = useSignal<number>();
    useTask$(({ track }) => {
      if (!Number.isNaN(track(() => value))) {
        input.value = value;
      }
    });
    return (
      <div class={props.class}>
        <input
          {...props}
          class={clsx(
            "input input-bordered w-full max-w-xs",
            error ? "input-error" : "",
          )}
          id={name}
          type="number"
          value={input.value}
        />
      </div>
    );
  },
);
