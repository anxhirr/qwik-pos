import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { InitialValues, ResponseData } from "@modular-forms/qwik";
import { formAction$, useFormStore, valiForm$ } from "@modular-forms/qwik";
import { OrderPrefBottomNav } from "~/components/bottom-nav/pref/order";
import { OrderPrefForm } from "~/components/forms/pref/OrderPrefForm";
import { INITIAL_ORDER_DOC_NO } from "~/constants/defaults";
import { fakeMongoDbId } from "~/constants/fake";
import { getOrderPref } from "~/lib/queries/order-pref";
import { prisma } from "~/routes/plugin@auth";
import type { OrderPrefFormType } from "~/validation/orderPrefSchema";
import { OrderPrefSchema } from "~/validation/orderPrefSchema";
import { getSessionSS } from "~/utils/auth";

export const useFormLoader = routeLoader$<InitialValues<OrderPrefFormType>>(
  async (event) => {
    const session = getSessionSS(event);

    const pref = await getOrderPref(session.shopId, session.userId);
    const { currency, shouldPrint, paymentMethod, printFormat, docNo } =
      pref || {};

    if (!pref) {
      return {
        currency: "",
        shouldPrint: false,
        paymentMethod: "",
        printFormat: "",
        docNo: INITIAL_ORDER_DOC_NO,
      };
    }

    return {
      currency,
      shouldPrint,
      paymentMethod,
      printFormat,
      docNo,
    };
  },
);

export const useFormAction = formAction$<OrderPrefFormType, ResponseData>(
  async (values, event) => {
    const session = getSessionSS(event);

    const pref = await getOrderPref(session.shopId, session.userId);

    const updated = await prisma.orderPref.upsert({
      where: {
        id: pref?.id || fakeMongoDbId,
      },
      update: {
        currency: values.currency,
        shouldPrint: values.shouldPrint,
        paymentMethod: values.paymentMethod,
        printFormat: values.printFormat,
        docNo: values.docNo,
      },
      create: {
        currency: values.currency,
        shouldPrint: values.shouldPrint,
        paymentMethod: values.paymentMethod,
        printFormat: values.printFormat,
        docNo: values.docNo,
        shopId: session.shopId,
        userId: session.userId,
      },
    });

    if (!updated.id) {
      return {
        status: "error",
        message: "Error updating pref",
      };
    }

    return {
      status: "success",
      data: {},
    };
  },
  valiForm$(OrderPrefSchema),
);

export default component$(() => {
  const action = useFormAction();
  const form = useFormStore<OrderPrefFormType, ResponseData>({
    loader: useFormLoader(),
    validate: valiForm$(OrderPrefSchema),
  });

  return (
    <>
      <div class="main-content">
        <OrderPrefForm form={form} action={action} />
      </div>

      <OrderPrefBottomNav form={form} />
    </>
  );
});
