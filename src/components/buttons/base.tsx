import type { ButtonHTMLAttributes, QwikMouseEvent } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";

type Props = {
  onClick$?: (
    event: QwikMouseEvent<HTMLButtonElement, MouseEvent>,
    element: HTMLButtonElement,
  ) => any;
  text?: string;
  form?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  variant?: "primary" | "secondary" | "success" | "danger" | "warning";
  disabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
};

export const Button = component$<Props>(
  ({
    text,
    onClick$,
    form,
    type = "button",
    variant = "primary",
    disabled,
    isLoading,
    loadingText,
    ...rest
  }) => {
    return (
      <button
        class={`btn btn-${variant}`}
        form={form}
        onClick$={onClick$}
        type={type}
        disabled={disabled}
        {...rest}
      >
        {isLoading ? loadingText : text}
      </button>
    );
  },
);
