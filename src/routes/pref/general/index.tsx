import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { InitialValues, ResponseData } from "@modular-forms/qwik";
import { formAction$, useFormStore, valiForm$ } from "@modular-forms/qwik";
import { GeneralPrefBottomNav } from "~/components/bottom-nav/pref/general";
import { GeneralPrefForm } from "~/components/forms/pref/GeneralPrefForm";
import { fakeMongoDbId } from "~/constants/fake";
import { getGeneralPref } from "~/lib/queries/general-pref";
import { prisma } from "~/routes/plugin@auth";
import type { GeneralPrefFormType } from "~/types-and-validation/generalPrefSchema";
import { GeneralPrefSchema } from "~/types-and-validation/generalPrefSchema";
import { getSessionSS } from "~/utils/auth";

export const useFormLoader = routeLoader$<InitialValues<GeneralPrefFormType>>(
  async (event) => {
    const session = getSessionSS(event);

    const pref = await getGeneralPref(session.shopId, session.userId);
    const { language } = pref || {};

    if (!pref) {
      return {
        language: "",
      };
    }

    return {
      language,
    };
  },
);

export const useFormAction = formAction$<GeneralPrefFormType, ResponseData>(
  async (values, event) => {
    const session = getSessionSS(event);

    const pref = await getGeneralPref(session.shopId, session.userId);

    const updated = await prisma.generalPref.upsert({
      where: {
        id: pref?.id || fakeMongoDbId,
      },
      update: {
        language: values.language,
      },
      create: {
        language: values.language,
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
  valiForm$(GeneralPrefSchema),
);

export default component$(() => {
  const action = useFormAction();
  const form = useFormStore<GeneralPrefFormType, ResponseData>({
    loader: useFormLoader(),
    validate: valiForm$(GeneralPrefSchema),
  });

  return (
    <>
      <div class="flex-1">
        <GeneralPrefForm form={form} action={action} />
      </div>

      <GeneralPrefBottomNav form={form} />
    </>
  );
});
