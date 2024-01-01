import clsx from "clsx";
import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import type { ModularInputProps } from "../../../types";
import { InputLabel } from "./InputLabel";
import { InputError } from "./InputError";
import { createDateTimeLocalString } from "~/utils/date";

type Props = {
  value: undefined | string | Date | number;
  type?: "date" | "datetime-local";
} & ModularInputProps;

export const DateInput = component$(
  ({ value, error, name, label, required, type = "date", ...props }: Props) => {
    const input = useSignal<string>();

    useTask$(({ track }) => {
      track(() => value);
      if (!value) return;
      const date = new Date(value);
      input.value = createDateTimeLocalString(date);
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
          type={type}
          value={input.value}
          aria-invalid={!!error}
          aria-errormessage={`${name}-error`}
        />
        <InputError name={name} error={error} />
      </div>
    );
  },
);
