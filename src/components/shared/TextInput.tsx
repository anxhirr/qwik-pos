import { component$ } from "@builder.io/qwik";
import clsx from "clsx";
// import { InputError } from "./InputError";
import { InputLabel } from "./InputLabel";
import type { ModularInputProps } from "../../../types";
import type { Maybe } from "@modular-forms/qwik";

type Props = {
  value: Maybe<string>;
} & ModularInputProps;

export const TextInput = component$(
  ({ label, value, error, ...props }: Props) => {
    const { name, required } = props;
    return (
      <div class="form-control w-full max-w-xs">
        <InputLabel name={name} label={label} required={required} />
        <input
          {...props}
          class={clsx(
            "input input-bordered w-full",
            error ? "input-error" : "",
          )}
          id={name}
          type="text"
          value={value}
          aria-invalid={!!error}
          aria-errormessage={`${name}-error`}
        />
        {/* <InputError name={name} error={error} /> */}
      </div>
    );
  },
);
