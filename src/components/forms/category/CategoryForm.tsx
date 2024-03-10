import { $, component$ } from "@builder.io/qwik";
import {
  Field,
  Form,
  type ResponseData,
  type FormStore,
  FieldArray,
  remove,
  getValues,
  insert,
} from "@modular-forms/qwik";
import { CustomSelect, SelectMultiValue, TextInput } from "~/components/shared";
import { CATEGORY_TYPES_ENUM, CATEGORY_FORM_ID } from "~/constants/enum";
import type { CategoryFormType } from "~/types-and-validation/categorySchema";
import type {
  CustSelectParentEmitFnArgs,
  FromStoreAction,
} from "../../../../types";

type Props = {
  form: FormStore<CategoryFormType, ResponseData>;
  action: FromStoreAction<CategoryFormType>;
};

export const CategoryForm = component$<Props>(({ form, action }) => {
  const selectedTypes = getValues(form, "types").map((type) => ({
    label: type,
    value: type,
  }));

  const handleTypeSelect = $(({ newOpt }: CustSelectParentEmitFnArgs) => {
    insert(form, "types", {
      at: selectedTypes.length,
      value: newOpt.value,
    });
  });
  return (
    <Form
      id={CATEGORY_FORM_ID}
      class="flex flex-col gap-2"
      of={form}
      action={action}
    >
      <div class="flex">
        <CustomSelect
          isMulti
          isCreatable
          options={CATEGORY_TYPES_ENUM.map((option) => ({
            label: option,
            value: option,
          }))}
          placeholder="Categories"
          value={""}
          onSelect={$((data: CustSelectParentEmitFnArgs) => {
            handleTypeSelect(data);
          })}
          onCreate={$((data: CustSelectParentEmitFnArgs) => {
            handleTypeSelect(data);
          })}
          selectedOptions={selectedTypes}
        >
          <FieldArray of={form} name="types">
            {(fieldArray) => (
              <>
                {fieldArray.items.map((item, index) => {
                  return (
                    <div key={item}>
                      <Field of={form} name={`types.${index}`}>
                        {(field) => (
                          <SelectMultiValue
                            label={field.value as string}
                            onRemove={$(() => {
                              remove(form, "types", {
                                at: index,
                              });
                            })}
                          />
                        )}
                      </Field>
                    </div>
                  );
                })}
              </>
            )}
          </FieldArray>
        </CustomSelect>

        <Field of={form} name="color">
          {(field, props) => (
            <TextInput
              {...props}
              value={field.value}
              error={field.error}
              placeholder="Color"
            />
          )}
        </Field>
      </div>
      <div>
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
      </div>
    </Form>
  );
});
