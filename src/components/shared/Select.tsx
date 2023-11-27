import type { PropFunction, QwikChangeEvent } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import clsx from "clsx";
import { InputError } from "./InputError";
import type { SelectOption } from "../../../types";

type Props = {
  name: string;
  options: SelectOption[];
  onChange$: PropFunction<
    (
      event: QwikChangeEvent<HTMLSelectElement>,
      element: HTMLSelectElement,
    ) => void
  >;
  value?: string | undefined;
  error?: string;
  placeholder?: string;
  class?: string;
};

export const Select = component$(
  ({ error, name, value, options, ...props }: Props) => {
    return (
      <div class={props.class}>
        <select
          {...props}
          class={clsx(
            "input input-bordered w-full max-w-xs",
            error ? "input-error" : "",
          )}
          id={name}
          aria-invalid={!!error}
          aria-errormessage={`${name}-error`}
        >
          <option disabled selected>
            {props.placeholder}
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              selected={value === option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
        <InputError name={name} error={error} />
      </div>
    );
  },
);
