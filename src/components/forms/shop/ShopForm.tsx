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
import { ShopUpdateActionBar } from "~/components/bottom-action-bar/shop/update";
import type { ShopFormType } from "~/types-and-validation/shopSchema";

type Props = {
  form: FormStore<ShopFormType, ResponseData>;
  action: Maybe<
    ActionStore<
      FormActionStore<ShopFormType, ResponseData>,
      PartialValues<ShopFormType>,
      true
    >
  >;
};

export const ShopForm = component$<Props>(({ form, action }) => {
  return (
    <Form of={form} action={action} class="flex flex-col gap-4">
      <Field of={form} name="address">
        {(field, props) => (
          <div>
            <input
              class="input input-bordered"
              {...props}
              type="text"
              value={field.value}
              placeholder="Address"
            />
            {field.error && <div>{field.error}</div>}
          </div>
        )}
      </Field>
      <Field of={form} name="baseCurrency">
        {(field, props) => (
          <div>
            <input
              class="input input-bordered"
              {...props}
              type="text"
              value={field.value}
              placeholder="Base Currency"
            />
            {field.error && <div>{field.error}</div>}
          </div>
        )}
      </Field>
      <Field of={form} name="city">
        {(field, props) => (
          <div>
            <input
              class="input input-bordered"
              {...props}
              type="text"
              value={field.value}
              placeholder="City"
            />
            {field.error && <div>{field.error}</div>}
          </div>
        )}
      </Field>
      <Field of={form} name="description">
        {(field, props) => (
          <div>
            <input
              class="input input-bordered"
              {...props}
              type="text"
              value={field.value}
              placeholder="Description"
            />
            {field.error && <div>{field.error}</div>}
          </div>
        )}
      </Field>
      <Field of={form} name="email">
        {(field, props) => (
          <div>
            <input
              class="input input-bordered"
              {...props}
              type="text"
              value={field.value}
              placeholder="Email"
            />
            {field.error && <div>{field.error}</div>}
          </div>
        )}
      </Field>
      <Field of={form} name="name">
        {(field, props) => (
          <div>
            <input
              class="input input-bordered"
              {...props}
              type="text"
              value={field.value}
              placeholder="Name"
            />
            {field.error && <div>{field.error}</div>}
          </div>
        )}
      </Field>
      <Field of={form} name="ownerId">
        {(field, props) => (
          <div>
            <input
              class="input input-bordered"
              {...props}
              type="text"
              value={field.value}
              placeholder="Owner ID"
            />
            {field.error && <div>{field.error}</div>}
          </div>
        )}
      </Field>
      <Field of={form} name="phone">
        {(field, props) => (
          <div>
            <input
              class="input input-bordered"
              {...props}
              type="text"
              value={field.value}
              placeholder="Phone"
            />
            {field.error && <div>{field.error}</div>}
          </div>
        )}
      </Field>
      <ShopUpdateActionBar form={form} />
    </Form>
  );
});
