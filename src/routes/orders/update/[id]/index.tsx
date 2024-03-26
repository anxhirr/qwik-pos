import { $, component$, useSignal, useTask$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type {
  InitialValues,
  ResponseData,
  SubmitHandler,
} from "@modular-forms/qwik";
import {
  formAction$,
  getErrors,
  reset,
  useFormStore,
  valiForm$,
} from "@modular-forms/qwik";
import { CreateOrderBottomNav } from "~/components/bottom-nav";
import { ReceiptDialog } from "~/components/dialogs";
import { OrderForm } from "~/components/forms/order";
import { INITIAL_ORDER_DOC_NO, ORDER_EMPTY_ROW } from "~/constants/defaults";
import { getAllItems } from "~/lib/queries/items";
import { prisma } from "~/routes/plugin@auth";
import type { OrderFormType } from "~/validation/orderSchema";
import { OrderSchema } from "~/validation/orderSchema";
import { getSessionSS } from "~/utils/auth";

export const useFormAction = formAction$<OrderFormType, ResponseData>(
  async () => {
    //TODO: Implement
    return {
      status: "error",
    };
  },
  valiForm$(OrderSchema),
);

export const useItemsLoader = routeLoader$(async (event) => {
  const session = getSessionSS(event);
  const items = await getAllItems(session.shopId);

  return items;
});

export const useFormLoader = routeLoader$<InitialValues<OrderFormType>>(
  async (event) => {
    const { id } = event.params;
    const data = await prisma.order.findFirst({
      where: {
        id,
      },
      include: {
        items: true,
      },
    });

    if (!data) {
      return {
        date: new Date().toISOString(),
        currency: "USD",
        exchangeRate: 1,
        payment: {
          method: "cash",
        },
        discount: {
          amount: 0,
          type: "",
        },
        items: [ORDER_EMPTY_ROW],
        customer: {
          name: "",
        },

        docNo: INITIAL_ORDER_DOC_NO,
        notes: "",
      };
    }

    return {
      date: new Date(data.date).toISOString(),
      currency: data.currency,
      exchangeRate: data.exchangeRate,
      payment: {
        method: data.paymentMethod,
      },
      discount: {
        amount: data.discountAmount,
        type: data.discountType,
      },
      items: data.items.map((item) => ({
        name: item.name,
        unit: item.unit,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        unitPriceWithTax: item.unitPriceWithTax,
      })),
      customer: {
        name: data.customerName,
      },
      docNo: data.docNo,
      notes: data.notes,
    };
  },
);

export default component$(() => {
  const action = useFormAction();
  const items = useItemsLoader();

  const showReceiptDialog = useSignal(false);
  const order = useSignal<OrderFormType>();

  const form = useFormStore<OrderFormType, ResponseData>({
    loader: useFormLoader(),
    validate: valiForm$(OrderSchema),
    fieldArrays: ["items"],
  });

  const errors = getErrors(form);
  console.log("errors", errors);

  const handleSubmit = $<SubmitHandler<OrderFormType>>((values) => {
    order.value = values;
  });

  useTask$(({ track }) => {
    track(action);
    if (action.isRunning) {
      console.log("isRunning");
      return;
    }

    if (action.status === 200) {
      showReceiptDialog.value = true;
      reset(form);
    }
  });

  return (
    <>
      <div class="main-content">
        <OrderForm
          form={form}
          action={action}
          items={items}
          handleSubmit={handleSubmit}
        />
      </div>

      <CreateOrderBottomNav form={form} />

      <ReceiptDialog
        show={showReceiptDialog.value}
        order={order.value}
        hide={$(() => {
          showReceiptDialog.value = false;
        })}
      />
    </>
  );
});
