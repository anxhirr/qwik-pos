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
import { CATEGORY_ENUM, CATEGORY_FORM_ID } from "~/constants/enum";
import type { CategoryFormType } from "~/types-and-validation/categorySchema";

type Props = {
  form: FormStore<CategoryFormType, ResponseData>;
  action: Maybe<
    ActionStore<
      FormActionStore<CategoryFormType, ResponseData>,
      PartialValues<CategoryFormType>,
      true
    >
  >;
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
            <div>
              <select
                {...props}
                value={field.value}
                class="select select-bordered w-full max-w-xs"
              >
                <option disabled selected>
                  Type
                </option>
                {CATEGORY_ENUM.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>

              {field.error && <div>{field.error}</div>}
            </div>
          )}
        </Field>
        <Field of={form} name="color">
          {(field, props) => (
            <div>
              <input
                {...props}
                value={field.value}
                type="color"
                placeholder="Color"
                class="input input-bordered w-20"
              />
              {field.error && <div>{field.error}</div>}
            </div>
          )}
        </Field>
      </div>
      <div>
        <Field of={form} name="name">
          {(field, props) => (
            <div>
              <input
                {...props}
                value={field.value}
                type="text"
                placeholder="Name"
                class="input input-bordered w-full max-w-xs"
              />
              {field.error && <div>{field.error}</div>}
            </div>
          )}
        </Field>
      </div>
    </Form>
  );
});
