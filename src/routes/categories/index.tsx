import { CategoriesBActionBar } from "~/components/bottom-action-bar/categories";

import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { InitialValues } from "@modular-forms/qwik";
import { formAction$, useForm, valiForm$ } from "@modular-forms/qwik";
import type { CategoryForm } from "~/types-and-validation/category";
import { CategorySchema } from "~/types-and-validation/category";
import { CATEGORY_ENUM } from "~/constants/enum";

export const useFormLoader = routeLoader$<InitialValues<CategoryForm>>(() => ({
  type: "",
  name: "",
  color: "",
}));

export const useFormAction = formAction$<CategoryForm>((values) => {
  // Runs on server
}, valiForm$(CategorySchema));

export const useLoader = routeLoader$(async () => {});
export default component$(() => {
  const data = useLoader();

  const [form, { Form, Field }] = useForm<CategoryForm>({
    loader: useFormLoader(),
    action: useFormAction(),
    validate: valiForm$(CategorySchema),
  });

  return (
    <div>
      <ul class="3xl:grid-cols-4 grid grid-cols-1 gap-4  sm:grid-cols-2 xl:grid-cols-3">
        <dialog id="category_modal" class="modal">
          <div class="modal-box">
            <h3 class="text-lg font-bold">New Category</h3>
            <p class="py-4">Press ESC key or click the button below to close</p>
            <Form class="flex flex-col gap-2">
              <div class="flex">
                <Field name="type">
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
                        {CATEGORY_ENUM.map((category) => (
                          <option key={category}>{category}</option>
                        ))}
                      </select>

                      {field.error && <div>{field.error}</div>}
                    </div>
                  )}
                </Field>
                <Field name="color">
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
                <Field name="name">
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
            <div class="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <div class="flex gap-2">
                  <button class="btn btn-warning">Close</button>
                  <button class="btn btn-success" type="submit">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </dialog>
      </ul>
      <CategoriesBActionBar />
    </div>
  );
});
