import { component$ } from "@builder.io/qwik";
import type { FormStore, ResponseData } from "@modular-forms/qwik";
import type { OrderFormType } from "~/validation/orderSchema";
import { BottomNav } from ".";
import { BOTTOM_NAVBAR_SLOTS, ORDER_FORM_ID } from "~/constants/enum";
import { Button } from "~/components/buttons";
import { CreateBtn } from "../buttons/common";
import { PendingIcon } from "../icons";

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
            Icon={PendingIcon}
            form={ORDER_FORM_ID}
          />
          <CreateBtn
            submitting={form.submitting}
            dirty={form.dirty}
            formId={ORDER_FORM_ID}
          />
        </div>
      </div>
    </BottomNav>
  );
});
