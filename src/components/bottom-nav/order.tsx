import { component$ } from "@builder.io/qwik";
import type { FormStore, ResponseData } from "@modular-forms/qwik";
import type { OrderFormType } from "~/types-and-validation/orderSchema";
import { BottomNav } from ".";
import { BOTTOM_NAVBAR_SLOTS, ORDER_FORM_ID } from "~/constants/enum";
import { Button } from "~/components/buttons";

type Props = {
  form: FormStore<OrderFormType, ResponseData>;
};

export const CreateOrderBottomNav = component$<Props>(({ form }) => {
  return (
    <BottomNav>
      <div q:slot={BOTTOM_NAVBAR_SLOTS.END}>
        <div class="flex gap-3">
          <Button
            text="Draft"
            isLoading={form.submitting}
            disabled={form.submitting}
            loadingText="Drafting..."
            show={form.dirty}
            type="submit"
            variant="warning"
            form={ORDER_FORM_ID}
          />
          <Button
            text="Create"
            isLoading={form.submitting}
            disabled={form.submitting}
            loadingText="Creating..."
            show={form.dirty}
            type="submit"
            variant="success"
            form={ORDER_FORM_ID}
          />
        </div>
      </div>
    </BottomNav>
  );
});
