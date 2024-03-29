import { component$ } from "@builder.io/qwik";
import type { FormStore, ResponseData } from "@modular-forms/qwik";
import { UpdateBtn } from "~/components/buttons/common";
import { SHOP_FORM_ID } from "~/constants/enum";
import type { ShopFormType } from "~/validation/shopSchema";

type Props = {
  form?: FormStore<ShopFormType, ResponseData>;
};
export const ShopUpdateActionBar = component$<Props>(({ form }) => {
  return (
    <div class="navbar fixed bottom-0 right-0 bg-base-100">
      <div class="navbar-start"></div>
      <div class="navbar-center"></div>
      <div class="navbar-end">
        <div class="flex gap-3">
          <UpdateBtn
            submitting={form?.submitting}
            dirty={form?.dirty}
            formId={SHOP_FORM_ID}
          />
        </div>
      </div>
    </div>
  );
});
