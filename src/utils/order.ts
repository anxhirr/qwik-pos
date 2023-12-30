import type { OrderFormType } from "~/types-and-validation/orderSchema";

export const calcOrderTotal = (order: OrderFormType) => {
  return order.items.reduce((acc, item) => {
    return acc + item.quantity * item.unitPrice;
  }, 0);
};
