import type { DefaultSession } from "@auth/core/types";

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
};

export interface CustomSelectOption {
  value: string;
  label: string;
}
