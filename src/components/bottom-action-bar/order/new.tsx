import { component$ } from "@builder.io/qwik";
import type { FormStore, ResponseData } from "@modular-forms/qwik";
import {
  IcBaselineCheckCircle,
  IcRoundInsertDriveFile,
} from "~/components/icons";
import type { OrderFormType } from "~/types-and-validation/orderSchema";

type Props = {
  form: FormStore<OrderFormType, ResponseData>;
};
export const NewOrderActBar = component$<Props>(({ form }) => {
  return (
    <div class="navbar fixed bottom-0 right-0 bg-base-100">
      <div class="navbar-start"></div>
      <div class="navbar-center"></div>
      <div class="navbar-end">
        <div class="flex gap-3">
          {form.dirty && (
            <>
              <button
                disabled={form.submitting}
                class="btn btn-warning"
                type="submit"
              >
                <IcRoundInsertDriveFile />
                {form.submitting ? "Drafting..." : "Draft"}
              </button>
              <button
                disabled={form.submitting}
                class="btn btn-success"
                type="submit"
              >
                <IcBaselineCheckCircle />
                {form.submitting ? "Saving..." : "Save"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
});
