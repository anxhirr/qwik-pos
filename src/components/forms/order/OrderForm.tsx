import type { Signal } from "@builder.io/qwik";
import { $, component$, useComputed$, useSignal } from "@builder.io/qwik";
import type { SubmitHandler } from "@modular-forms/qwik";
import {
  Field,
  Form,
  type ResponseData,
  type FormStore,
  FieldArray,
  replace,
  insert,
  move,
  remove,
  swap,
} from "@modular-forms/qwik";
import {
  CustomSelect,
  NumberInput,
  Select,
  TextInput,
} from "~/components/shared";
import type { Item, PriceRule } from "@prisma/client";

import {
  CURRENCIES,
  DISCOUNT_TYPES,
  ORDER_FORM_ID,
  PAYMENT_METHODS,
} from "~/constants/enum";
import { type OrderFormType } from "~/types-and-validation/orderSchema";
import type { CustomSelectOption, FromStoreAction } from "../../../../types";
import { Button } from "~/components/buttons";
import { OrderOptionsDrawer } from "~/components/drawer";
import {
  SwapVertIcon,
  PlusIcon,
  BackspaceFillIcon,
  DeleteIcon,
  ReplayFillIcon,
  MoreHorizIcon,
} from "~/components/icons";
import { ORDER_EMPTY_ROW } from "~/constants/defaults";
import { getActivePrice } from "~/utils";

type ItemWithPriceRules = Item & { priceRules: PriceRule[] };

type Props = {
  form: FormStore<OrderFormType, ResponseData>;
  action: FromStoreAction<OrderFormType>;
  items: Readonly<Signal<ItemWithPriceRules[]>>;
  handleSubmit: SubmitHandler<OrderFormType>;
};
export const OrderForm = component$<Props>(
  ({ form, action, items, handleSubmit }) => {
    const showDrawer = useSignal(false);

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
          quantity: 1,
          unitPrice: getActivePrice(item.priceRules),
          unitPriceWithTax: getActivePrice(item.priceRules),
        },
      });
    });

    const handleCloseDrawer = $(() => {
      console.log("close drawer");
      showDrawer.value = false;
    });

    const addNewEmptyRow = $((index: number) => {
      insert(form, "items", {
        at: index,
        value: {
          name: "",
          unit: "",
          quantity: 0,
          unitPrice: 0,
          unitPriceWithTax: 0,
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
          id={ORDER_FORM_ID}
        >
          <div class="flex gap-4">
            <Field of={form} name="customer.name">
              {(field, props) => (
                <TextInput
                  {...props}
                  value={field.value}
                  error={field.error}
                  placeholder="Customer"
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
          </div>
          <div class="flex gap-2">
            <div class="flex items-end gap-1">
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
              <Field of={form} type="number" name="discount.amount">
                {(field, props) => (
                  <div class="col-span-2">
                    <NumberInput
                      {...props}
                      value={field.value}
                      error={field.error}
                      placeholder="Discount Amount"
                    />
                  </div>
                )}
              </Field>
              <Button
                onClick$={() => {
                  showDrawer.value = true;
                }}
                text="Extra Options"
                type="button"
                variant="secondary"
                Icon={MoreHorizIcon}
              />
            </div>
          </div>

          <div class="mt-6 flex flex-col gap-2">
            <div class="grid grid-cols-7 gap-1">
              <div class="col-span-2">Item</div>
              <div>Unit</div>
              <div>Quantity</div>
              <div>Unit Price</div>
              <div>Unit Price With Tax</div>
              <div>Actions</div>
            </div>

            <FieldArray of={form} name="items">
              {(fieldArray) => {
                const isOnlyOneRow = fieldArray.items.length === 1;
                return (
                  <>
                    <div class="flex flex-col gap-2">
                      {fieldArray.items.map((item, index) => (
                        <div key={item} class="grid grid-cols-7 gap-1">
                          <div class="col-span-2">
                            <Field
                              of={form}
                              type="string"
                              name={`items.${index}.name`}
                            >
                              {(field) => (
                                <CustomSelect
                                  options={options.value.slice(0, 10)}
                                  placeholder="Item"
                                  fullWidth
                                  initialvalue={field.value}
                                  onChange$={$((data: CustomSelectOption[]) => {
                                    handleItemSelect(data[0], index);
                                  })}
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

                          <div class="flex gap-1">
                            <Button
                              onClick$={() => {
                                replace(form, "items", {
                                  at: index,
                                  value: ORDER_EMPTY_ROW,
                                });
                              }}
                              tooltipText="Clear row fields"
                              type="button"
                              variant="secondary"
                              Icon={BackspaceFillIcon}
                            />
                            <Button
                              onClick$={() => {
                                console.log("remove", index);
                                remove(form, "items", { at: index });
                              }}
                              tooltipText="Remove row"
                              Icon={DeleteIcon}
                              type="button"
                              variant="secondary"
                              disabled={isOnlyOneRow}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div class="grid grid-cols-3 gap-2">
                      <Button
                        onClick$={() => {
                          addNewEmptyRow(fieldArray.items.length);
                        }}
                        text="Add Row"
                        type="button"
                        variant="secondary"
                        Icon={PlusIcon}
                      />
                      <Button
                        onClick$={() => {
                          move(form, "items", {
                            from: 0,
                            to: fieldArray.items.length - 1,
                          });
                        }}
                        text="Move First To Last"
                        type="button"
                        variant="secondary"
                        disabled={fieldArray.items.length < 2}
                        Icon={SwapVertIcon}
                      />
                      <Button
                        onClick$={() => {
                          swap(form, "items", {
                            at: 0,
                            and: 1,
                          });
                        }}
                        text="Swap First two"
                        type="button"
                        variant="secondary"
                        disabled={fieldArray.items.length < 2}
                        Icon={ReplayFillIcon}
                      />
                    </div>
                  </>
                );
              }}
            </FieldArray>
          </div>

          <OrderOptionsDrawer
            show={showDrawer.value}
            form={form}
            hide={handleCloseDrawer}
          />
        </Form>
      </>
    );
  },
);
