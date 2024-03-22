import { $, component$ } from "@builder.io/qwik";
import {
  Field,
  Form,
  type ResponseData,
  type FormStore,
  FieldArray,
  getValues,
  setValues,
} from "@modular-forms/qwik";
import { CustomSelect, TextInput } from "~/components/shared";
import { CATEGORY_TYPES_ENUM, CATEGORY_FORM_ID } from "~/constants/enum";
import type { CategoryFormType } from "~/types-and-validation/categorySchema";
import type { CustomSelectOption, FromStoreAction } from "../../../../types";

type Props = {
  form: FormStore<CategoryFormType, ResponseData>;
  action: FromStoreAction<CategoryFormType>;
};

export const CategoryForm = component$<Props>(({ form, action }) => {
  const types = getValues(form, "types");

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
          options={CATEGORY_TYPES_ENUM.map((option) => ({
            label: option,
            value: option,
          }))}
          placeholder="Categories"
          onChange$={$((data: CustomSelectOption[]) => {
            console.log("data", data);

            setValues(
              form,
              "types",
              data.map((opt) => opt.value),
            );
          })}
          initialSelected={types}
        />
        <FieldArray of={form} name="types">
          {(fieldArray) => (
            <>
              {fieldArray.items.map((item, index) => {
                return (
                  <Field key={item} of={form} name={`types.${index}`}>
                    {() => <></>}
                    {/* just to get value to be tracked */}
                  </Field>
                );
              })}
            </>
          )}
        </FieldArray>

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
