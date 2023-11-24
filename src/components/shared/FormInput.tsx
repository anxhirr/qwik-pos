import {
  component$,
  type PropFunction,
  type QwikChangeEvent,
  type QwikFocusEvent,
} from "@builder.io/qwik";
import clsx from "clsx";
import { InputError } from "./InputError";

type Props = {
  ref: PropFunction<(element: Element) => void>;
  type: "text" | "email" | "tel" | "password" | "url" | "number" | "date";
  name: string;
  value: string | number | undefined;
  onInput$: PropFunction<(event: Event, element: HTMLInputElement) => void>;
  onChange$: PropFunction<
    (
      event: QwikChangeEvent<HTMLInputElement>,
      element: HTMLInputElement,
    ) => void
  >;
  onBlur$: PropFunction<
    (event: QwikFocusEvent<HTMLInputElement>, element: HTMLInputElement) => void
  >;
  placeholder?: string;
  class?: string;
  error?: string;
};

export const FormInput = component$(
  ({ value, error, name, ...props }: Props) => {
    return (
      <div class={props.class}>
        <input
          {...props}
          class={clsx(
            "input input-bordered w-full max-w-xs",
            error ? "input-error" : "",
          )}
          id={name}
          value={value}
          aria-invalid={!!error}
          aria-errormessage={`${name}-error`}
        />
        <InputError name={name} error={error} />
      </div>
    );
  },
);
