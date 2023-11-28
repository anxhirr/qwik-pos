import { component$ } from "@builder.io/qwik";
import clsx from "clsx";
import { InputError } from "./InputError";
import { InputLabel } from "./InputLabel";

type Props = {
  name: string;
  value: string | undefined;
  label?: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
  class?: string;
};

export const TextInput = component$(
  ({ error, name, label, required, ...props }: Props) => {
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
          aria-invalid={!!error}
          aria-errormessage={`${name}-error`}
        />
        <InputError name={name} error={error} />
      </div>
    );
  },
);
