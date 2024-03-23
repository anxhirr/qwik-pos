import { component$ } from "@builder.io/qwik";
import type { FormStore, ResponseData } from "@modular-forms/qwik";
import type { OrderPrefFormType } from "~/validation/orderPrefSchema";
import { BottomNav } from "../base";
import { BOTTOM_NAVBAR_SLOTS, PREF_ORDER_FORM_ID } from "~/constants/enum";
import { UpdateBtn } from "~/components/buttons/common";

type Props = {
  form?: FormStore<OrderPrefFormType, ResponseData>;
};
export const OrderPrefBottomNav = component$<Props>(({ form }) => {
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
