import { component$ } from "@builder.io/qwik";
import {
  Field,
  Form,
  type ResponseData,
  type FormStore,
} from "@modular-forms/qwik";
import { Select } from "~/components/shared";
import { LANGUAGES, PREF_ORDER_FORM_ID } from "~/constants/enum";
import type { GeneralPrefFormType } from "~/validation/generalPrefSchema";
import type { FromStoreAction } from "~/types";

type Props = {
  form: FormStore<GeneralPrefFormType, ResponseData>;
  action: FromStoreAction<GeneralPrefFormType>;
};

export const GeneralPrefForm = component$<Props>(({ form, action }) => {
  return (
    <Form
      of={form}
      action={action}
      id={PREF_ORDER_FORM_ID}
      class="flex flex-col gap-4"
    >
      <Field of={form} name="language">
        {(field, props) => (
          <Select
            {...props}
            options={LANGUAGES.map((option) => ({
              label: option,
              value: option,
            }))}
            placeholder="Language"
            value={field.value}
            error={field.error}
          />
        )}
      </Field>
    </Form>
  );
});
