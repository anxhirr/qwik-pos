import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import clsx from "clsx";
import { InputLabel } from "./InputLabel";
import type { ModularInputProps } from "../../../types";
import type { Maybe } from "@modular-forms/qwik";

type NumberInputProps = {
  value: Maybe<number>;
} & ModularInputProps;

export const NumberInput = component$(
  ({ label, value, error, ...props }: NumberInputProps) => {
    const { name, required } = props;
    // Update signal if value is not `NaN`
    const input = useSignal<number>();
    useTask$(({ track }) => {
      if (!Number.isNaN(track(() => value))) {
        input.value = value;
      }
    });
    return (
      <div class={props.class}>
        <InputLabel name={name} label={label} required={required} />
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
