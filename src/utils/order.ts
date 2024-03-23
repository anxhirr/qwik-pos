import type { OrderFormType } from "~/validation/orderSchema";

export const calcOrderTotal = (order: OrderFormType) => {
  return order.items.reduce((acc, item) => {
    return acc + item.quantity * item.unitPrice;
  }, 0);
};
