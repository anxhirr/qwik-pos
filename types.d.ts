import type { DefaultSession } from "@auth/core/types";
import type {
  PropFunction,
  QwikChangeEvent,
  QwikFocusEvent,
  QwikIntrinsicElements,
  Signal,
} from "@builder.io/qwik";
import type { ActionStore } from "@builder.io/qwik-city";
import type {
  FormActionStore,
  PartialValues,
  ResponseData,
} from "@modular-forms/qwik";
import type { Order } from "@prisma/client";
import type { ColumnDef, Table } from "@tanstack/table-core";
import type { PrismaItemWithPrice } from "~/types-and-validation";

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
  disabled?: boolean;
}

interface DialogProps {
  show: Signal<boolean>;
  hide: () => void;
}

interface ConfirmDialogProps extends DialogProps {
  onConfirm$: () => void;
  onCancel$: () => void;
}

type Entity = "ITEM" | "CATEGORY" | "ORDER" | "CUSTOMER";

type IconProps = {
  props?: QwikIntrinsicElements["svg"];
  key?: string;
  size?: Size;
};

type Size = "xs" | "sm" | "md" | "lg";
type Position = "top" | "bottom" | "left" | "right";
type Variant = "info" | "success" | "warning" | "error";

type AvailableTables = Table<Order> | Table<PrismaItemWithPrice>;
type TableHookData<T> = Readonly<Signal<T[]>>;
type TableHookColumns<T> = ColumnDef<T, any>[];

type FromStoreAction<T> = ActionStore<
  FormActionStore<T, ResponseData>,
  PartialValues<T>,
  true
>;

type CRUDactions = "CREATE" | "UPDATE";

type PaymentMethod = "CASH" | "CARD" | "BANK";

type PrintFormat = "80mm" | "58mm" | "A4" | "A5";

type DiscountType = "PERCENTAGE" | "AMOUNT";

type Currency = "ALL" | "EUR" | "USD";

type Language = "AL" | "EN";

type CategoryType = "ITEM" | "CUSTOMER";
