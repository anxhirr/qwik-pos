import clsx from "clsx";
import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import type { ModularInputProps } from "../../../types";
import type { Maybe } from "@modular-forms/qwik";
import { InputLabel } from "./InputLabel";
import { InputError } from "./InputError";

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
          aria-invalid={!!error}
          aria-errormessage={`${name}-error`}
        />
        <InputError name={name} error={error} />
      </div>
    );
  },
);
