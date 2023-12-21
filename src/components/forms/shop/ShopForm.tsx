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
import { Select, TextInput } from "~/components/shared";
import { CURRENCIES, SHOP_FORM_ID } from "~/constants/enum";
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
    <Form
      of={form}
      action={action}
      id={SHOP_FORM_ID}
      class="flex flex-col gap-4"
    >
      <Field of={form} name="address">
        {(field, props) => (
          <TextInput
            {...props}
            value={field.value}
            error={field.error}
            placeholder="Address"
          />
        )}
      </Field>
      <Field of={form} name="baseCurrency">
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
      <Field of={form} name="city">
        {(field, props) => (
          <TextInput
            {...props}
            value={field.value}
            error={field.error}
            placeholder="City"
          />
        )}
      </Field>
      <Field of={form} name="description">
        {(field, props) => (
          <TextInput
            {...props}
            value={field.value}
            error={field.error}
            placeholder="Description"
          />
        )}
      </Field>
      <Field of={form} name="email">
        {(field, props) => (
          <TextInput
            {...props}
            value={field.value}
            error={field.error}
            placeholder="Email"
          />
        )}
      </Field>
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
      {/* <Field of={form} name="ownerId">
        {(field, props) => (
          <TextInput
            {...props}
            value={field.value}
            error={field.error}
            placeholder="Owner ID"
          />
        )}
      </Field> */}
      <Field of={form} name="phone">
        {(field, props) => (
          <TextInput
            {...props}
            value={field.value}
            error={field.error}
            placeholder="Phone"
          />
        )}
      </Field>
      <ShopUpdateActionBar form={form} />
    </Form>
  );
});
