import clsx from "clsx";
import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import type { ModularInputProps } from "../../../types";
import { InputLabel } from "./InputLabel";
import { InputError } from "./InputError";

type NumberInputProps = {
  value: undefined | string | number | Date;
} & ModularInputProps;

export const DateInput = component$(
  ({ value, error, name, label, required, ...props }: NumberInputProps) => {
    const input = useSignal<string>();

    useTask$(({ track }) => {
      track(() => value);
      // Transform date or number to string
      typeof value === "number" || value instanceof Date
        ? (input.value = new Date(value).toISOString().split("T", 1)[0])
        : typeof value === "string"
        ? (input.value = value)
        : (input.value = undefined);
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
          type="date"
          value={input.value}
          aria-invalid={!!error}
          aria-errormessage={`${name}-error`}
        />
        <InputError name={name} error={error} />
      </div>
    );
  },
);
