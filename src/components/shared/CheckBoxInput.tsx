import { component$ } from "@builder.io/qwik";
import clsx from "clsx";
import { InputError } from "./InputError";

type Props = {
  label: string;
  name: string;
  value: boolean | undefined;
  error?: string;
  placeholder?: string;
  class?: string;
};

export const CheckBoxInput = component$(
  ({ value, error, label, name, ...props }: Props) => {
    return (
      <div class={props.class}>
        <div class="form-control w-full max-w-xs">
          <label class="label cursor-pointer">
            <span class="label-text">{label}</span>
            <input
              {...props}
              type="checkbox"
              class={clsx("toggle", error ? "input-error" : "")}
              checked={value}
              aria-invalid={!!error}
              aria-errormessage={`${name}-error`}
            />
          </label>
        </div>
        <InputError name={name} error={error} />
      </div>
    );
  },
);
