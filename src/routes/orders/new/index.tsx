import { component$ } from "@builder.io/qwik";
import type { ResponseData } from "@modular-forms/qwik";
import { formAction$, useFormStore, valiForm$ } from "@modular-forms/qwik";
import { OrderForm } from "~/components/forms/order/OrderForm";
import type { OrderFormType } from "~/types-and-validation/orderSchema";
import { OrderSchema } from "~/types-and-validation/orderSchema";

export const useFormAction = formAction$<OrderFormType, ResponseData>(
  async (values) => {
    console.log(values);
  },
  valiForm$(OrderSchema),
);

export default component$(() => {
  const action = useFormAction();

  const form = useFormStore<OrderFormType, ResponseData>({
    loader: {
      value: {
        date: "",
        currency: "",
        customerId: "",
        exchangeRate: 1,
        payment: {
          method: "",
          amount: 0,
          currency: "",
        },
        discount: {
          amount: 0,
          type: "",
        },
        items: [
          {
            id: "",
            name: "",
            unit: "",
            quantity: 0,
            unitPrice: 0,
            unitPriceWithTax: 0,
          },
        ],
        customer: {
          name: "",
          id: "",
        },
        docNo: "",
        layout: "",
        notes: "",
      },
    },
    validate: valiForm$(OrderSchema),
    fieldArrays: ["items"],
  });
  return (
    <div class="h-full">
      <OrderForm form={form} action={action} />
    </div>
  );
});
