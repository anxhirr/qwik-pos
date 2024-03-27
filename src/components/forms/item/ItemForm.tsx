import { $, component$, useComputed$ } from "@builder.io/qwik";
import {
  Field,
  Form,
  type ResponseData,
  type FormStore,
  FieldArray,
  insert,
  remove,
  setValues,
  getValues,
} from "@modular-forms/qwik";
import { Button } from "~/components/buttons/base";
import {
  CheckBoxInput,
  CustomSelect,
  NumberInput,
  TextInput,
} from "~/components/shared";
import { DateInput } from "~/components/shared";
import { PRICE_END_DATE, PRICE_START_DATE } from "~/constants/defaults";
import { ITEM_FORM_ID } from "~/constants/enum";
import { type ItemFormType } from "~/validation/itemSchema";
import type {
  FromStoreAction,
  CustomSelectOption,
  CategoryType,
  SelectFnArgs,
} from "~/types";
import { BackspaceFillIcon, PlusIcon } from "~/components/icons";
import { useCreateCategoryRouteAction } from "~/shared/actions";
import { useItemCategoriesLoader } from "~/shared/loaders";

type Props = {
  form: FormStore<ItemFormType, ResponseData>;
  action: FromStoreAction<ItemFormType>;
};

export const ItemForm = component$<Props>(({ form, action }) => {
  const createCatAction = useCreateCategoryRouteAction();
  const categories = useItemCategoriesLoader();

  const options = useComputed$(() => {
    return categories.value.map((cat) => ({
      label: cat.name,
      value: cat.id,
    }));
  });

  const categoryIDs = getValues(form, "categoryIDs")!;

  const handleCreateNewCat = $(async ({ option }: SelectFnArgs) => {
    try {
      const cat = {
        name: option.label,
        types: ["ITEM"] as CategoryType[],
        color: "blue",
      };
      const res = await createCatAction.submit(cat);
      const id = res.value.data?.id;
      return id;
    } catch (error) {
      console.log("error", error);
    }
  });

  const handleCatsChange = $((options: CustomSelectOption[]) => {
    setValues(
      form,
      "categoryIDs",
      options.map((opt) => opt.value),
    );
  });

  return (
    <Form of={form} action={action} id={ITEM_FORM_ID}>
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

          <CustomSelect
            isMulti
            isCreatable
            options={options.value}
            placeholder="Categories"
            onChange={handleCatsChange}
            initialSelected={categoryIDs}
            onCreate={handleCreateNewCat}
            optimisticCreate
          />
          <FieldArray of={form} name="categoryIDs">
            {(fieldArray) => (
              <>
                {fieldArray.items.map((item, index) => {
                  return (
                    <Field key={item} of={form} name={`categoryIDs.${index}`}>
                      {() => <></>}
                      {/* just to get value to be tracked */}
                    </Field>
                  );
                })}
              </>
            )}
          </FieldArray>
          <FieldArray of={form} name="priceRules">
            {(fieldArray) => (
              <>
                <div class="flex max-w-xs flex-col gap-2">
                  {fieldArray.items.map((item, index) => {
                    const showAddButton = index === fieldArray.items.length - 1;
                    return (
                      <div key={item} class="grid grid-cols-2 gap-1">
                        <Field
                          of={form}
                          type="string"
                          name={`priceRules.${index}.start`}
                        >
                          {(field, props) => (
                            <DateInput
                              value={field.value}
                              error={field.error}
                              placeholder="Start date"
                              type="datetime-local"
                              {...props}
                            />
                          )}
                        </Field>
                        <Field
                          of={form}
                          type="string"
                          name={`priceRules.${index}.end`}
                        >
                          {(field, props) => (
                            <DateInput
                              value={field.value}
                              error={field.error}
                              placeholder="Start date"
                              type="datetime-local"
                              {...props}
                            />
                          )}
                        </Field>
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
                        <Button
                          show={!showAddButton}
                          text="Remove Rule"
                          variant="secondary"
                          Icon={BackspaceFillIcon}
                          onClick$={() => {
                            remove(form, "priceRules", {
                              at: index,
                            });
                          }}
                        />
                        <div class={!showAddButton ? "hidden" : "flex gap-1"}>
                          <Button
                            show={showAddButton}
                            tooltipText="Add New Price Rule"
                            Icon={PlusIcon}
                            variant="secondary"
                            onClick$={() => {
                              insert(form, "priceRules", {
                                value: {
                                  start: PRICE_START_DATE.toISOString(),
                                  end: PRICE_END_DATE.toISOString(),
                                  price: 0,
                                },
                                at: index + 1,
                              });
                            }}
                          />
                          <Button
                            show={showAddButton}
                            Icon={BackspaceFillIcon}
                            tooltipText="Remove Rule"
                            variant="secondary"
                            disabled={fieldArray.items.length === 1}
                            onClick$={() => {
                              remove(form, "priceRules", {
                                at: index,
                              });
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
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
    </Form>
  );
});
