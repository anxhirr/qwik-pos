import { component$ } from "@builder.io/qwik";
import clsx from "clsx";
import { InputError } from "./InputError";

type Props = {
  name: string;
  value: string | undefined;
  error?: string;
  placeholder?: string;
  class?: string;
};

export const TextInput = component$(({ error, name, ...props }: Props) => {
  return (
    <div class={props.class}>
      <input
        {...props}
        class={clsx(
          "input input-bordered w-full max-w-xs",
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
});
