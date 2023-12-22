import type { Signal } from "@builder.io/qwik";
import { $, component$, useComputed$ } from "@builder.io/qwik";
import type { ActionStore } from "@builder.io/qwik-city";
import type {
  FormActionStore,
  Maybe,
  PartialValues,
  SubmitHandler,
} from "@modular-forms/qwik";
import {
  Field,
  Form,
  type ResponseData,
  type FormStore,
  FieldArray,
  replace,
  insert,
  move,
} from "@modular-forms/qwik";
import {
  CustomSelect,
  DateInput,
  NumberInput,
  Select,
  TextInput,
} from "~/components/shared";
import type { Item } from "@prisma/client";

import { CURRENCIES, DISCOUNT_TYPES, PAYMENT_METHODS } from "~/constants/enum";
import { type OrderFormType } from "~/types-and-validation/orderSchema";
import { NewOrderActBar } from "~/components/bottom-action-bar/order/new";
import type { CustomSelectOption } from "../../../../types";
import { IcRoundPlus, IcRoundSwapVert } from "~/components/icons";

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
  handleSubmit: SubmitHandler<OrderFormType>;
};
export const OrderForm = component$<Props>(
  ({ form, action, items, handleSubmit }) => {
    const options = useComputed$(() => {
      return items.value.map((item) => ({
        label: item.name,
        value: item.id,
      }));
    });

    const handleItemSelect = $((option: CustomSelectOption, index: number) => {
      const item = items.value.find((item) => item.id === option.value);
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
    });

    return (
      <>
        <Form
          of={form}
          action={action}
          onSubmit$={handleSubmit}
          class="flex flex-col gap-2"
        >
          <div class="flex gap-2">
            <Field of={form} type="number" name="docNo">
              {(field, props) => (
                <NumberInput
                  {...props}
                  value={field.value}
                  error={field.error}
                  placeholder="Doc No"
                  label="Doc No"
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
                />
              )}
            </Field>
            <Field of={form} name="customer.name">
              {(field, props) => (
                <TextInput
                  {...props}
                  value={field.value}
                  error={field.error}
                  placeholder="Customer"
                  label="Customer"
                />
              )}
            </Field>
          </div>

          <div class="flex gap-4">
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

            <Field of={form} name="payment.method">
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
          <div class="flex gap-2">
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
            <div class="flex items-end gap-1">
              <Field of={form} type="number" name="discount.amount">
                {(field, props) => (
                  <div class="col-span-2">
                    <NumberInput
                      {...props}
                      value={field.value}
                      error={field.error}
                      placeholder="Discount Amount"
                      label="Discount"
                    />
                  </div>
                )}
              </Field>
            </div>
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
          </div>

          <div class="mt-6 flex flex-col gap-2">
            <div class="grid grid-cols-6 gap-1">
              <div class="col-span-2">Item</div>
              <div>Unit</div>
              <div>Quantity</div>
              <div>Unit Price</div>
              <div>Unit Price With Tax</div>
            </div>

            <FieldArray of={form} name="items">
              {(fieldArray) => (
                <>
                  <div class="flex flex-col gap-2">
                    {fieldArray.items.map((item, index) => (
                      <div key={item} class="grid grid-cols-6 gap-1">
                        <div class="col-span-2">
                          <Field
                            of={form}
                            type="string"
                            name={`items.${index}.name`}
                          >
                            {(field, props) => (
                              <CustomSelect
                                {...props}
                                options={options.value}
                                placeholder="Item"
                                value={field.value}
                                onSelect={$((option: CustomSelectOption) =>
                                  handleItemSelect(option, index),
                                )}
                              />
                            )}
                          </Field>
                        </div>
                        <Field
                          of={form}
                          type="string"
                          name={`items.${index}.unit`}
                        >
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
                      </div>
                    ))}
                  </div>
                  <div class="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      onClick$={() => {
                        insert(form, "items", {
                          at: fieldArray.items.length,
                          value: {
                            name: "",
                            unit: "",
                            quantity: 0,
                            unitPrice: 0,
                            unitPriceWithTax: 0,
                          },
                        });
                      }}
                    >
                      <IcRoundPlus />
                      Add row
                    </button>
                    <button
                      type="button"
                      class="btn btn-secondary"
                      onClick$={() => {
                        move(form, "items", {
                          from: 0,
                          to: fieldArray.items.length - 1,
                        });
                      }}
                    >
                      <IcRoundSwapVert />
                      Move First To Last
                    </button>
                  </div>
                </>
              )}
            </FieldArray>
          </div>

          <NewOrderActBar form={form} />
        </Form>
      </>
    );
  },
);
