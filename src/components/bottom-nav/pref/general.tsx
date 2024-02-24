import { component$ } from "@builder.io/qwik";
import type { FormStore, ResponseData } from "@modular-forms/qwik";
import { BottomNav } from "../base";
import { BOTTOM_NAVBAR_SLOTS, PREF_ORDER_FORM_ID } from "~/constants/enum";
import { UpdateBtn } from "~/components/buttons/common";
import type { GeneralPrefFormType } from "~/types-and-validation/generalPrefSchema";

type Props = {
  form?: FormStore<GeneralPrefFormType, ResponseData>;
};
export const GeneralPrefBottomNav = component$<Props>(({ form }) => {
  return (
    <BottomNav>
      <div q:slot={BOTTOM_NAVBAR_SLOTS.END}>
        <UpdateBtn
          submitting={form?.submitting}
          dirty={form?.dirty}
          formId={PREF_ORDER_FORM_ID}
        />
      </div>
    </BottomNav>
  );
});
