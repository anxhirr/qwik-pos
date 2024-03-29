import { component$ } from "@builder.io/qwik";
import {
  Field,
  Form,
  type ResponseData,
  type FormStore,
} from "@modular-forms/qwik";
import { CheckBoxInput, NumberInput, Select } from "~/components/shared";
import {
  CURRENCIES,
  PAYMENT_METHODS,
  PREF_ORDER_FORM_ID,
  PRINT_FORMATS,
} from "~/constants/enum";
import type { OrderPrefFormType } from "~/validation/orderPrefSchema";
import type { FromStoreAction } from "~/types";

type Props = {
  form: FormStore<OrderPrefFormType, ResponseData>;
  action: FromStoreAction<OrderPrefFormType>;
};

export const OrderPrefForm = component$<Props>(({ form, action }) => {
  return (
    <Form
      of={form}
      action={action}
      id={PREF_ORDER_FORM_ID}
      class="flex flex-col gap-4"
    >
      <Field of={form} name="currency">
        {(field, props) => (
          <Select
            {...props}
            options={CURRENCIES.map((option) => ({
              label: option,
              value: option,
            }))}
            placeholder="Currency"
            value={field.value}
            error={field.error}
          />
        )}
      </Field>
      <Field of={form} name="shouldPrint" type="boolean">
        {(field, props) => (
          <CheckBoxInput
            label="Print"
            value={field.value}
            error={field.error}
            {...props}
          />
        )}
      </Field>
      <Field of={form} name="paymentMethod">
        {(field, props) => (
          <Select
            {...props}
            options={PAYMENT_METHODS.map((option) => ({
              label: option,
              value: option,
            }))}
            placeholder="Payment Method"
            value={field.value}
            error={field.error}
          />
        )}
      </Field>
      <Field of={form} name="printFormat">
        {(field, props) => (
          <Select
            {...props}
            options={PRINT_FORMATS.map((option) => ({
              label: option,
              value: option,
            }))}
            placeholder="Print Format"
            value={field.value}
            error={field.error}
          />
        )}
      </Field>
      <Field of={form} name="docNo" type="number">
        {(field, props) => (
          <NumberInput
            value={field.value}
            error={field.error}
            placeholder="Document Number"
            {...props}
          />
        )}
      </Field>
    </Form>
  );
});
