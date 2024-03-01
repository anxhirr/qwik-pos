import { component$ } from "@builder.io/qwik";
import { Drawer } from "./base";
import type { FormStore, ResponseData } from "@modular-forms/qwik";
import { Field } from "@modular-forms/qwik";
import { DateInput, NumberInput, TextInput } from "../shared";
import type { OrderFormType } from "~/types-and-validation/orderSchema";

type Props = {
  show: boolean;
  hide: () => void;
  form: FormStore<OrderFormType, ResponseData>;
};

export const OrderOptionsDrawer = component$<Props>(({ show, hide, form }) => {
  return (
    <Drawer show={show} hide={hide} title="Extra Options">
      <Field of={form} type="number" name="docNo">
        {(field, props) => (
          <NumberInput
            {...props}
            value={field.value}
            error={field.error}
            placeholder="Doc No"
            label="Doc No"
            disabled
          />
        )}
      </Field>
      <Field of={form} type="string" name="date">
        {(field, props) => (
          <DateInput
            {...props}
            value={field.value}
            error={field.error}
            label="Date"
            type="datetime-local"
          />
        )}
      </Field>
      <Field of={form} type="number" name="exchangeRate">
        {(field, props) => (
          <div class="col-span-2">
            <NumberInput
              {...props}
              value={field.value}
              error={field.error}
              placeholder="Exchange Rate"
              label="Exchange Rate"
            />
          </div>
        )}
      </Field>
      <Field of={form} name="notes">
        {(field, props) => (
          <TextInput
            value={field.value}
            error={field.error}
            placeholder="Notes"
            label="Notes"
            {...props}
          />
        )}
      </Field>
    </Drawer>
  );
});
