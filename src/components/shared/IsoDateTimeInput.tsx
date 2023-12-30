import clsx from "clsx";
import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import type { ModularInputProps } from "../../../types";
import { InputLabel } from "./InputLabel";
import { InputError } from "./InputError";

type Props = {
  value: undefined | string | Date | number;
} & ModularInputProps;

export const IsoDateTimeInput = component$(
  ({ value, error, name, label, required, ...props }: Props) => {
    const input = useSignal<string>();

    useTask$(({ track }) => {
      track(() => value);
      if (!value) return;
      // remove the timezone since it is not supported by the datetime-local input
      input.value = new Date(value).toISOString().slice(0, -1);
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
          type="datetime-local"
          value={input.value}
          aria-invalid={!!error}
          aria-errormessage={`${name}-error`}
        />
        <InputError name={name} error={error} />
      </div>
    );
  },
);
