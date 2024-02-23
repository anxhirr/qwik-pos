import { component$ } from "@builder.io/qwik";
import { Button } from "~/components/buttons";
import { CheckCircleIcon, UpdateIcon } from "~/components/icons";

type Props = {
  submitting?: boolean;
  dirty?: boolean;
  formId?: string;
};
export const UpdateBtn = component$<Props>(({ submitting, dirty, formId }) => {
  return (
    <Button
      text="Update"
      isLoading={submitting}
      disabled={submitting}
      loadingText="Updating..."
      show={dirty}
      type="submit"
      variant="success"
      form={formId}
      Icon={UpdateIcon}
    />
  );
});
export const CreateBtn = component$<Props>(({ submitting, dirty, formId }) => {
  return (
    <Button
      text="Create"
      isLoading={submitting}
      disabled={submitting}
      loadingText="Creating..."
      show={dirty}
      type="submit"
      variant="success"
      form={formId}
      Icon={CheckCircleIcon}
    />
  );
});
