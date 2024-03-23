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
import { fakeMongoDbId } from "~/constants/fake";
import { getAllItems } from "~/lib/queries/items";
import { getOrderPref } from "~/lib/queries/order-pref";
// import { successToast } from "~/providers/toast";
import { prisma } from "~/routes/plugin@auth";
import type { OrderFormType } from "~/validation/orderSchema";
import { OrderSchema } from "~/validation/orderSchema";
import { getSessionSS } from "~/utils/auth";

export const useFormAction = formAction$<OrderFormType, ResponseData>(
  async (values, event) => {
    const { shopId, userId } = getSessionSS(event);

    const orderPref = await prisma.orderPref.findFirst({
      where: {
        shopId,
        userId,
      },
      select: {
        id: true,
        docNo: true,
      },
    });

    const [orderTrans, orderPrefTrans] = await prisma.$transaction([
      prisma.order.create({
        data: {
          currency: values.currency,
          date: new Date(),
          customerId: "6572dd392ce8dcf9b2347ac0", // TODO: get from customer
          customerName: values.customer.name,
          discountAmount: values.discount.amount,
          discountType: values.discount.type,
          exchangeRate: values.exchangeRate,
          docNo: orderPref?.docNo || INITIAL_ORDER_DOC_NO,
          paymentMethod: values.payment.method,
          items: { create: values.items },
          notes: values.notes,
          shopId,
          userId,
        },
      }),
      prisma.orderPref.upsert({
        where: {
          id: orderPref?.id || fakeMongoDbId,
        },
        update: {
          docNo: {
            increment: 1,
          },
        },
        create: {
          docNo: INITIAL_ORDER_DOC_NO,
          currency: values.currency,
          shouldPrint: true,
          paymentMethod: values.payment.method,
          shopId,
          userId,
        },
      }),
    ]);
    console.log("orderTrans, orderPrefTrans", orderTrans, orderPrefTrans);

    return {
      status: "success",
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
    const session = getSessionSS(event);

    const pref = await getOrderPref(session.shopId, session.userId);

    return {
      date: new Date().toISOString(),
      currency: pref?.currency,
      // customerId: "",
      exchangeRate: 1,
      payment: {
        method: pref?.paymentMethod,
        // amount: 0,
        // currency: "",
      },
      discount: {
        amount: 0,
        type: "",
      },
      items: [ORDER_EMPTY_ROW],
      customer: {
        name: "",
        // id: "",
      },
      docNo: pref?.docNo,
      // layout: "",
      notes: "",
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
        show={showReceiptDialog}
        order={order.value}
        hide={$(() => {
          showReceiptDialog.value = false;
        })}
      />
    </>
  );
});
