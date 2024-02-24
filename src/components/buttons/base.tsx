import type {
  ButtonHTMLAttributes,
  Component,
  QwikMouseEvent,
} from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import type { IconProps, Position, Size } from "../../../types";
import clsx from "clsx";
import { Indicator } from "../indicator/base";
import { Tooltip } from "../tooltip/base";

type Props = {
  show?: boolean;
  size?: Size;
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
  tooltipPosition?: Position;
  fullWidth?: boolean;
  justify?: "start" | "end" | "center";
  class?: string;
};

export const Button = component$<Props>(
  ({
    show = true,
    text,
    size,
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
    tooltipPosition,
    fullWidth,
    justify,
    ...rest
  }) => {
    if (!show) return null;

    return (
      <Tooltip text={tooltipText} position={tooltipPosition}>
        <button
          class={clsx(
            `btn btn-${variant}`,
            isCircle && "btn-circle",
            size && `btn-${size}`,
            fullWidth && "w-full",
            justify && `justify-${justify}`,
          )}
          // class="btn btn-circle btn-secondary btn-sm w-full justify-start"
          form={form}
          onClick$={onClick$}
          type={type}
          disabled={disabled}
          {...rest}
        >
          {/* TODO: remove  || "" make the types dynamic + remove warning*/}
          <Indicator text={indicatorText}>
            {Icon && <Icon />}
            {isLoading ? loadingText : text}
          </Indicator>
        </button>
      </Tooltip>
    );
  },
);
