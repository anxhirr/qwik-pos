import { component$ } from "@builder.io/qwik";
import type { FormStore, ResponseData } from "@modular-forms/qwik";
import { IcBaselineCheckCircle, IcRoundPlus } from "~/components/icons";
import type { ShopFormType } from "~/types-and-validation/shopSchema";

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
          {form?.dirty && (
            <button
              disabled={form.submitting}
              class="btn btn-success"
              type="submit"
            >
              <IcBaselineCheckCircle />
              {form.submitting ? "Updating..." : "Update"}
            </button>
          )}
          <button class="btn btn-secondary" type="submit">
            <IcRoundPlus />
            New Shop
          </button>
        </div>
      </div>
    </div>
  );
});
