import type {
  ButtonHTMLAttributes,
  Component,
  QwikMouseEvent,
} from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import type { IconProps } from "../../../types";
import clsx from "clsx";
import { Indicator } from "../indicator/base";
import { Tooltip } from "../tooltip/base";

type Props = {
  show?: boolean;
  onClick$?: (
    event: QwikMouseEvent<HTMLButtonElement, MouseEvent>,
    element: HTMLButtonElement,
  ) => any;
  text?: string;
  Icon?: Component<IconProps>;
  form?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  variant?: "primary" | "secondary" | "success" | "error" | "warning" | "ghost";
  disabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  isCircle?: boolean;
  indicatorText?: string;
  tooltipText?: string;
};

export const Button = component$<Props>(
  ({
    show = true,
    text,
    onClick$,
    form,
    type = "button",
    Icon,
    variant = "primary",
    disabled,
    isLoading,
    loadingText,
    isCircle,
    indicatorText,
    tooltipText,
    ...rest
  }) => {
    if (!show) return null;

    return (
      <Tooltip text={tooltipText}>
        <button
          class={clsx("btn", `btn-${variant}`, isCircle && "btn-circle")}
          form={form}
          onClick$={onClick$}
          type={type}
          disabled={disabled}
          {...rest}
        >
          {/* TODO: remove  || "" make the types dynamic*/}
          <Indicator text={indicatorText}>
            {Icon && <Icon />} {/* TODO: remove warning*/}
            {isLoading ? loadingText : text}
          </Indicator>
        </button>
      </Tooltip>
    );
  },
);
