import type { DefaultSession } from "@auth/core/types";
import type {
  PropFunction,
  QwikChangeEvent,
  QwikFocusEvent,
} from "@builder.io/qwik";

export type OrderItemType = {
  id: string;
  name: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  unitPriceWithTax: number;
  // taxAmount: string;
  // discountAmount: string;
  // price: string;
  // finalPrice: string;
  // total: string;
  // merged: boolean;
};

export type AuthSession = DefaultSession & {
  userId: string;
  shopId: string;
  roleId: string;
};

export interface CustomSelectOption {
  value: string;
  label: string;
}

export interface ModularInputProps {
  ref: PropFunction<(element: Element) => void>;
  name: string;
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
  required?: boolean;
  class?: string;
  label?: string;
  error?: string;
}
