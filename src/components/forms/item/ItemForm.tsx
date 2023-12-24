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
import type { Category } from "@prisma/client";
import { NewItemBActionBar } from "~/components/bottom-action-bar/items/new";
import {
  CheckBoxInput,
  DateInput,
  NumberInput,
  Select,
  TextInput,
} from "~/components/shared";
import { type ItemFormType } from "~/types-and-validation/itemSchema";

type Props = {
  form: FormStore<ItemFormType, ResponseData>;
  action: Maybe<
    ActionStore<
      FormActionStore<ItemFormType, ResponseData>,
      PartialValues<ItemFormType>,
      true
    >
  >;
  categories: Category[];
};

export const ItemForm = component$<Props>(({ form, action, categories }) => {
  return (
    <Form of={form} action={action}>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div class="flex flex-col gap-4">
          <Field of={form} name="name">
            {(field, props) => (
              <TextInput
                {...props}
                value={field.value}
                error={field.error}
                placeholder="Name"
              />
            )}
          </Field>
          <Field of={form} name="unit">
            {(field, props) => (
              <TextInput
                {...props}
                value={field.value}
                error={field.error}
                placeholder="Unit"
              />
            )}
          </Field>
          <Field of={form} name="category">
            {(field, props) => (
              <Select
                {...props}
                error={field.error}
                options={categories.map((category) => ({
                  label: category.name,
                  value: category.id,
                }))}
                placeholder="Category"
              />
            )}
          </Field>
          <FieldArray of={form} name="priceRules">
            {(fieldArray) => (
              <>
                <div class="flex flex-col gap-2">
                  {fieldArray.items.map((item, index) => (
                    <div key={item} class="grid grid-cols-2 gap-1">
                      <Field
                        of={form}
                        type="Date"
                        name={`priceRules.${index}.start`}
                      >
                        {(field, props) => (
                          <DateInput
                            value={field.value}
                            error={field.error}
                            placeholder="Start date"
                            {...props}
                          />
                        )}
                      </Field>
                      <Field
                        of={form}
                        type="Date"
                        name={`priceRules.${index}.end`}
                      >
                        {(field, props) => (
                          <DateInput
                            value={field.value}
                            error={field.error}
                            placeholder="Start date"
                            {...props}
                          />
                        )}
                      </Field>
                      <div class="col-span-2">
                        <Field
                          of={form}
                          type="number"
                          name={`priceRules.${index}.price`}
                        >
                          {(field, props) => (
                            <NumberInput
                              value={field.value}
                              error={field.error}
                              placeholder="Price"
                              {...props}
                            />
                          )}
                        </Field>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </FieldArray>
        </div>
        <div class="flex flex-col gap-4">
          <Field of={form} name="barcode">
            {(field, props) => (
              <TextInput
                {...props}
                value={field.value}
                error={field.error}
                placeholder="Barcode"
              />
            )}
          </Field>
          <Field of={form} name="code">
            {(field, props) => (
              <TextInput
                {...props}
                value={field.value}
                error={field.error}
                placeholder="Code"
              />
            )}
          </Field>
          <Field of={form} name="description">
            {(field, props) => (
              <div>
                <textarea
                  {...props}
                  value={field.value}
                  placeholder="Description"
                  class="textarea textarea-bordered w-full max-w-xs"
                />
                {field.error && <div>{field.error}</div>}
              </div>
            )}
          </Field>
        </div>

        <div class="col-span-1 flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
          <div class="grid grid-cols-2 gap-4">
            <Field of={form} name="active" type="boolean">
              {(field, props) => (
                <CheckBoxInput
                  label="Active"
                  value={field.value}
                  error={field.error}
                  {...props}
                />
              )}
            </Field>
            <Field of={form} name="favorite" type="boolean">
              {(field, props) => (
                <CheckBoxInput
                  label="Favorite"
                  value={field.value}
                  error={field.error}
                  {...props}
                />
              )}
            </Field>
          </div>
        </div>
      </div>
      <NewItemBActionBar form={form} />
    </Form>
  );
});
