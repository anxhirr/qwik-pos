import type { ButtonHTMLAttributes, QwikMouseEvent } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";

type Props = {
  show?: boolean;
  onClick$?: (
    event: QwikMouseEvent<HTMLButtonElement, MouseEvent>,
    element: HTMLButtonElement,
  ) => any;
  text?: string;
  form?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  variant?: "primary" | "secondary" | "success" | "error" | "warning";
  disabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
};

export const Button = component$<Props>(
  ({
    show = true,
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
    if (!show) return null;

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
