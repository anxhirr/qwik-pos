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
import type { CATEGORY_TYPES_ENUM } from "~/constants/enum";
import type {
  ItemFormType,
  OrderFormType,
  PrismaItemWithPrice,
} from "~/validation";
import { AppRoutes } from "./routes.gen";

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

export type CustomSelectOption = {
  value: string;
  label: string;
};

export type SelectFnArgs = {
  option: CustomSelectOption;
  index: number;
  menuOptIdx: number;
};

export interface ModularInputProps {
  ref: (element: Element) => void;
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
  onFocus$?: PropFunction<
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
  show: boolean;
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

type AvailableFormTypes = ItemFormType | OrderFormType;

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

type CategoryType = (typeof CATEGORY_TYPES_ENUM)[number];

type PageSizes = 10 | 20 | 50 | 100;

type Section = {
  name: string;
  route: AppRoutes;
};
