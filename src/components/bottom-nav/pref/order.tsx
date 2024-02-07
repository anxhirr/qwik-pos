import { component$ } from "@builder.io/qwik";
import type { FormStore, ResponseData } from "@modular-forms/qwik";
import type { OrderPrefFormType } from "~/types-and-validation/orderPrefSchema";
import { BottomNav } from "../base";
import { BOTTOM_NAVBAR_SLOTS, PREF_ORDER_FORM_ID } from "~/constants/enum";
import { Button } from "~/components/buttons";

type Props = {
  form?: FormStore<OrderPrefFormType, ResponseData>;
};
export const OrderPrefBottomNav = component$<Props>(({ form }) => {
  return (
    <BottomNav>
      <div q:slot={BOTTOM_NAVBAR_SLOTS.END}>
        <Button
          text="Update"
          isLoading={form?.submitting}
          disabled={form?.submitting}
          loadingText="Updating..."
          show={form?.dirty}
          type="submit"
          variant="success"
          form={PREF_ORDER_FORM_ID}
        />
      </div>
    </BottomNav>
  );
});
