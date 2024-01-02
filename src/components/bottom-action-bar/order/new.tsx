import { component$ } from "@builder.io/qwik";
import type { FormStore, ResponseData } from "@modular-forms/qwik";
import {
  IcBaselineCheckCircle,
  IcRoundInsertDriveFile,
} from "~/components/icons";
import type { OrderFormType } from "~/types-and-validation/orderSchema";
import { BottomNavbar } from "../base";
import { BOTTOM_NAVBAR_SLOTS } from "~/constants/enum";

type Props = {
  form: FormStore<OrderFormType, ResponseData>;
};

export const NewOrderActBar = component$<Props>(({ form }) => {
  return (
    <BottomNavbar>
      <div q:slot={BOTTOM_NAVBAR_SLOTS.END}>
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
    </BottomNavbar>
  );
});
