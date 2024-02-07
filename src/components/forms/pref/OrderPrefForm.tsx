import { component$ } from "@builder.io/qwik";
import type { ActionStore } from "@builder.io/qwik-city";
import type {
  FormActionStore,
  Maybe,
  PartialValues,
} from "@modular-forms/qwik";
import {
  Field,
  Form,
  type ResponseData,
  type FormStore,
} from "@modular-forms/qwik";
import { CheckBoxInput, Select } from "~/components/shared";
import {
  CURRENCIES,
  PAYMENT_METHODS,
  PRINT_FORMATS,
  SHOP_FORM_ID,
} from "~/constants/enum";
import type { OrderPrefFormType } from "~/types-and-validation/orderPrefSchema";

type Props = {
  form: FormStore<OrderPrefFormType, ResponseData>;
  action: Maybe<
    ActionStore<
      FormActionStore<OrderPrefFormType, ResponseData>,
      PartialValues<OrderPrefFormType>,
      true
    >
  >;
};

export const OrderPrefForm = component$<Props>(({ form, action }) => {
  return (
    <Form
      of={form}
      action={action}
      id={SHOP_FORM_ID}
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
    </Form>
  );
});
