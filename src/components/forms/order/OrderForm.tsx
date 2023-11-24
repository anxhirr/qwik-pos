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
  FieldArray,
} from "@modular-forms/qwik";
import { FormInput } from "~/components/shared/FormInput";

import { CURRENCIES, DISCOUNT_TYPES, PAYMENT_METHODS } from "~/constants/enum";
import { type OrderFormType } from "~/types-and-validation/orderSchema";

type Props = {
  form: FormStore<OrderFormType, ResponseData>;
  action: Maybe<
    ActionStore<
      FormActionStore<OrderFormType, ResponseData>,
      PartialValues<OrderFormType>,
      true
    >
  >;
};
export const OrderForm = component$<Props>(({ form, action }) => {
  return (
    <Form of={form} action={action} class="flex flex-col gap-4">
      <Field of={form} name="date">
        {(field, props) => (
          <div>
            <input
              {...props}
              value={field.value}
              type="date"
              placeholder="Date"
              class="input input-bordered w-full max-w-xs"
            />
            {field.error && <div>{field.error}</div>}
          </div>
        )}
      </Field>
      <div class="flex gap-4">
        <Field of={form} name="customerId">
          {(field, props) => (
            <FormInput
              type="text"
              value={field.value}
              error={field.error}
              placeholder="Customer"
              {...props}
            />
          )}
        </Field>
        <Field of={form} name="currency">
          {(field, props) => (
            <div>
              <select
                {...props}
                value={field.value}
                class="select select-bordered w-full max-w-xs"
              >
                <option disabled selected>
                  Currency
                </option>
                {CURRENCIES.map((cur) => (
                  <option key={cur} value={cur}>
                    {cur}
                  </option>
                ))}
              </select>

              {field.error && <div>{field.error}</div>}
            </div>
          )}
        </Field>

        <Field of={form} name="payment.method">
          {(field, props) => (
            <div>
              <select
                {...props}
                value={field.value}
                class="select select-bordered w-full max-w-xs"
              >
                <option disabled selected>
                  Payment Method
                </option>
                {PAYMENT_METHODS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              {field.error && <div>{field.error}</div>}
            </div>
          )}
        </Field>
      </div>
      <div class="flex">
        <Field of={form} name="discount.amount">
          {(field, props) => (
            <div class="col-span-2">
              <input
                {...props}
                value={field.value}
                type="number"
                placeholder="Discount Amount"
                class="input input-bordered w-full max-w-xs"
              />
              {field.error && <div>{field.error}</div>}
            </div>
          )}
        </Field>
        <Field of={form} name="discount.type">
          {(field, props) => (
            <div>
              <select
                {...props}
                value={field.value}
                class="select select-bordered w-full max-w-xs"
              >
                <option disabled selected>
                  Discount Type
                </option>
                {DISCOUNT_TYPES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              {field.error && <div>{field.error}</div>}
            </div>
          )}
        </Field>
      </div>

      <h1>Items Grid</h1>
      <FieldArray of={form} name="items">
        {(fieldArray) =>
          fieldArray.items.map((item, index) => (
            <div key={item} class="hover flex gap-1">
              <Field of={form} name={`items.${index}.name`}>
                {(field, props) => (
                  <FormInput
                    type="text"
                    value={field.value}
                    error={field.error}
                    placeholder="Name"
                    {...props}
                  />
                )}
              </Field>
              <Field of={form} name={`items.${index}.unit`}>
                {(field, props) => (
                  <FormInput
                    type="text"
                    value={field.value}
                    error={field.error}
                    placeholder="Unit"
                    {...props}
                  />
                )}
              </Field>
              <Field of={form} name={`items.${index}.quantity`}>
                {(field, props) => (
                  <FormInput
                    type="number"
                    value={field.value}
                    error={field.error}
                    placeholder="Quantity"
                    {...props}
                  />
                )}
              </Field>
              <Field of={form} name={`items.${index}.unitPrice`}>
                {(field, props) => (
                  <FormInput
                    type="number"
                    value={field.value}
                    error={field.error}
                    placeholder="Unit Price"
                    {...props}
                  />
                )}
              </Field>
              <Field of={form} name={`items.${index}.unitPriceWithTax`}>
                {(field, props) => (
                  <FormInput
                    type="number"
                    value={field.value}
                    error={field.error}
                    placeholder="Unit Price With Tax"
                    {...props}
                  />
                )}
              </Field>
            </div>
          ))
        }
      </FieldArray>
    </Form>
  );
});
