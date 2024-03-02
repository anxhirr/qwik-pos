import { component$ } from "@builder.io/qwik";
import {
  Field,
  Form,
  type ResponseData,
  type FormStore,
} from "@modular-forms/qwik";
import { Select, TextInput } from "~/components/shared";
import { CATEGORY_TYPES_ENUM, CATEGORY_FORM_ID } from "~/constants/enum";
import type { CategoryFormType } from "~/types-and-validation/categorySchema";
import type { FromStoreAction } from "../../../../types";

type Props = {
  form: FormStore<CategoryFormType, ResponseData>;
  action: FromStoreAction<CategoryFormType>;
};

export const CategoryForm = component$<Props>(({ form, action }) => {
  return (
    <Form
      id={CATEGORY_FORM_ID}
      class="flex flex-col gap-2"
      of={form}
      action={action}
    >
      <div class="flex">
        <Field of={form} name="type">
          {(field, props) => (
            <Select
              {...props}
              options={CATEGORY_TYPES_ENUM.map((option) => ({
                label: option,
                value: option,
              }))}
              placeholder="Type"
            />
          )}
        </Field>
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
