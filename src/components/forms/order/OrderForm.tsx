import type { QwikChangeEvent, Signal } from "@builder.io/qwik";
import { $, component$, useComputed$ } from "@builder.io/qwik";
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
  replace,
} from "@modular-forms/qwik";
import { NumberInput, Select, TextInput } from "~/components/shared";
import type { Item } from "@prisma/client";

import { CURRENCIES, DISCOUNT_TYPES, PAYMENT_METHODS } from "~/constants/enum";
import { type OrderFormType } from "~/types-and-validation/orderSchema";
import { NewOrderActBar } from "~/components/bottom-action-bar/order/new";

type Props = {
  form: FormStore<OrderFormType, ResponseData>;
  action: Maybe<
    ActionStore<
      FormActionStore<OrderFormType, ResponseData>,
      PartialValues<OrderFormType>,
      true
    >
  >;
  items: Readonly<Signal<Item[]>>;
};
export const OrderForm = component$<Props>(({ form, action, items }) => {
  const options = useComputed$(() => {
    return items.value.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  });

  const handleItemSelect = $(
    (e: QwikChangeEvent<HTMLSelectElement>, index: number) => {
      const option = e.target.value;
      const item = items.value.find((item) => item.id === option);
      if (!item) return;
      replace(form, "items", {
        at: index,
        value: {
          // id: item.id,
          name: item.name,
          unit: item.unit,
          quantity: 10,
          unitPrice: 10,
          unitPriceWithTax: 10,
        },
      });
    },
  );
  return (
    <>
      <Form of={form} action={action} class="flex flex-col gap-4">
        <Field of={form} type="number" name="docNo">
          {(field, props) => (
            <NumberInput
              value={field.value}
              error={field.error}
              placeholder="Customer"
              {...props}
            />
          )}
        </Field>
        <Field of={form} type="string" name="date">
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
          <Field of={form} name="notes">
            {(field, props) => (
              <TextInput
                value={field.value}
                error={field.error}
                placeholder="Notes"
                {...props}
              />
            )}
          </Field>
          <Field of={form} name="customer.name">
            {(field, props) => (
              <TextInput
                value={field.value}
                error={field.error}
                placeholder="Customer"
                {...props}
              />
            )}
          </Field>
          <Field of={form} name="currency">
            {(field, props) => (
              <Select
                {...props}
                options={CURRENCIES.map((option) => ({
                  label: option,
                  value: option,
                }))}
                placeholder="Currency"
              />
            )}
          </Field>

          <Field of={form} name="payment.method">
            {(field, props) => (
              <Select
                {...props}
                options={PAYMENT_METHODS.map((option) => ({
                  label: option,
                  value: option,
                }))}
                placeholder="Payment Method"
              />
            )}
          </Field>
        </div>
        <div class="flex">
          <Field of={form} type="number" name="exchangeRate">
            {(field, props) => (
              <div class="col-span-2">
                <NumberInput
                  {...props}
                  value={field.value}
                  placeholder="Exchange Rate"
                />
                {field.error && <div>{field.error}</div>}
              </div>
            )}
          </Field>
          <Field of={form} type="number" name="discount.amount">
            {(field, props) => (
              <div class="col-span-2">
                <NumberInput
                  {...props}
                  value={field.value}
                  placeholder="Discount Amount"
                />
                {field.error && <div>{field.error}</div>}
              </div>
            )}
          </Field>
          <Field of={form} name="discount.type">
            {(field, props) => (
              <Select
                {...props}
                options={DISCOUNT_TYPES.map((option) => ({
                  label: option,
                  value: option,
                }))}
                placeholder="Discount Type"
              />
            )}
          </Field>
        </div>

        <h1>Items Grid</h1>
        <FieldArray of={form} name="items">
          {(fieldArray) => (
            <div class="flex gap-4">
              {fieldArray.items.map((item, index) => (
                <>
                  <Field of={form} type="string" name={`items.${index}.name`}>
                    {(field, props) => (
                      <Select
                        {...props}
                        options={options.value}
                        placeholder="Item"
                        onChange$={(e) => handleItemSelect(e, index)}
                      />
                    )}
                  </Field>
                  <Field of={form} type="string" name={`items.${index}.unit`}>
                    {(field, props) => (
                      <TextInput
                        value={field.value}
                        error={field.error}
                        placeholder="Unit"
                        {...props}
                      />
                    )}
                  </Field>
                  <Field
                    of={form}
                    type="number"
                    name={`items.${index}.quantity`}
                  >
                    {(field, props) => (
                      <NumberInput
                        value={field.value}
                        error={field.error}
                        placeholder="Quantity"
                        {...props}
                      />
                    )}
                  </Field>
                  <Field
                    of={form}
                    type="number"
                    name={`items.${index}.unitPrice`}
                  >
                    {(field, props) => (
                      <NumberInput
                        value={field.value}
                        error={field.error}
                        placeholder="Unit Price"
                        {...props}
                      />
                    )}
                  </Field>
                  <Field
                    of={form}
                    type="number"
                    name={`items.${index}.unitPriceWithTax`}
                  >
                    {(field, props) => (
                      <NumberInput
                        value={field.value}
                        error={field.error}
                        placeholder="Unit Price With Tax"
                        {...props}
                      />
                    )}
                  </Field>
                </>
              ))}
            </div>
          )}
        </FieldArray>
        <NewOrderActBar form={form} />
      </Form>
    </>
  );
});
