import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import clsx from "clsx";
import { InputLabel } from "./InputLabel";

type NumberInputProps = {
  name: string;
  value: undefined | string | number | Date;
  label?: string;
  required?: boolean;
  placeholder?: string;
  class?: string;
  error?: string;
};

export const DateInput = component$(
  ({ value, error, name, label, required, ...props }: NumberInputProps) => {
    // Transform date or number to string
    const input = useSignal<string>();

    useTask$(({ track }) => {
      track(() => value);
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
        />
      </div>
    );
  },
);
