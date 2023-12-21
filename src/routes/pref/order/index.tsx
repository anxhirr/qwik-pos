import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { InitialValues, ResponseData } from "@modular-forms/qwik";
import { formAction$, useFormStore, valiForm$ } from "@modular-forms/qwik";
import { OrderPrefForm } from "~/components/forms/pref/OrderPrefForm";
import { prisma } from "~/routes/plugin@auth";
import type { OrderPrefFormType } from "~/types-and-validation/orderPrefSchema";
import { OrderPrefSchema } from "~/types-and-validation/orderPrefSchema";
import { getSessionSS } from "~/utils/auth";

export const useFormLoader = routeLoader$<InitialValues<OrderPrefFormType>>(
  async (event) => {
    const session = getSessionSS(event);

    const pref = await prisma.orderPref.findFirst({
      where: {
        shopId: session?.shopId,
        userId: session?.userId,
      },
    });

    if (!pref) {
      return {
        currency: "",
        shouldPrint: false,
        paymentMethod: "",
      };
    }

    return {
      currency: pref.currency,
      shouldPrint: pref.shouldPrint,
      paymentMethod: pref.paymentMethod,
    };
  },
);

export const useFormAction = formAction$<OrderPrefFormType, ResponseData>(
  async (values, event) => {
    const session = getSessionSS(event);

    const pref = await prisma.orderPref.findFirst({
      where: {
        shopId: session?.shopId,
        userId: session?.userId,
      },
    });

    if (!pref?.id) {
      // TODO: create pref maybe?
      return {
        status: "error",
        message: "Error updating pref",
      };
    }

    const updated = await prisma.orderPref.update({
      where: {
        id: pref.id,
      },
      data: {
        currency: values.currency,
        shouldPrint: values.shouldPrint,
        paymentMethod: values.paymentMethod,
      },
    });

    if (!updated) {
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
    <div>
      <OrderPrefForm form={form} action={action} />
    </div>
  );
});
