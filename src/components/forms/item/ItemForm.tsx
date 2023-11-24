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
import type { Category } from "@prisma/client";
import { NewItemBActionBar } from "~/components/bottom-action-bar/items/new";
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
          <Field of={form} name="unit">
            {(field, props) => (
              <div>
                <input
                  {...props}
                  value={field.value}
                  type="text"
                  placeholder="Unit"
                  class="input input-bordered w-full max-w-xs"
                />
                {field.error && <div>{field.error}</div>}
              </div>
            )}
          </Field>
          <Field of={form} name="category">
            {(field, props) => (
              <div>
                <select
                  {...props}
                  value={field.value}
                  class="select select-bordered w-full max-w-xs"
                >
                  <option disabled selected>
                    Category
                  </option>
                  {categories.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>

                {field.error && <div>{field.error}</div>}
              </div>
            )}
          </Field>
        </div>
        <div class="flex flex-col gap-4">
          <Field of={form} name="barcode">
            {(field, props) => (
              <div>
                <input
                  {...props}
                  value={field.value}
                  type="text"
                  placeholder="Barcode"
                  class="input input-bordered w-full max-w-xs"
                />
                {field.error && <div>{field.error}</div>}
              </div>
            )}
          </Field>
          <Field of={form} name="code">
            {(field, props) => (
              <div>
                <input
                  {...props}
                  value={field.value}
                  type="text"
                  placeholder="Code"
                  class="input input-bordered w-full max-w-xs"
                />
                {field.error && <div>{field.error}</div>}
              </div>
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
                <div>
                  <div class="form-control">
                    <label class="label cursor-pointer">
                      <span class="label-text">Active</span>
                      <input
                        type="checkbox"
                        class="toggle"
                        {...props}
                        checked={field.value}
                      />
                    </label>
                  </div>
                  {field.error && <div>{field.error}</div>}
                </div>
              )}
            </Field>
            <Field of={form} name="favorite" type="boolean">
              {(field, props) => (
                <div>
                  <div class="form-control">
                    <label class="label cursor-pointer">
                      <span class="label-text">Favorite</span>
                      <input
                        type="checkbox"
                        class="toggle"
                        {...props}
                        checked={field.value}
                      />
                    </label>
                  </div>
                  {field.error && <div>{field.error}</div>}
                </div>
              )}
            </Field>
          </div>
        </div>
      </div>
      <NewItemBActionBar form={form} />
    </Form>
  );
});
