import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { BottomNav } from "./base";
import { BOTTOM_NAVBAR_SLOTS, ITEM_FORM_ID } from "~/constants/enum";
import type { FormStore, ResponseData } from "@modular-forms/qwik";
import type { ItemFormType } from "~/types-and-validation/itemSchema";
import { Button } from "../buttons";
import { PlusIcon } from "../icons";

type Props = {
  form?: FormStore<ItemFormType, ResponseData>;
};

export const ItemsBottomNav = component$(() => {
  return (
    <BottomNav>
      <div q:slot={BOTTOM_NAVBAR_SLOTS.END}>
        <Link href="/items/create">
          <Button text="Create Item" Icon={PlusIcon} variant="secondary" />
        </Link>
      </div>
    </BottomNav>
  );
});

export const CreateItemBottomNav = component$<Props>(({ form }) => {
  return (
    <BottomNav>
      <div q:slot={BOTTOM_NAVBAR_SLOTS.END}>
        <Button
          text="Create"
          isLoading={form?.submitting}
          disabled={form?.submitting}
          loadingText="Creating..."
          show={form?.dirty}
          type="submit"
          variant="success"
          form={ITEM_FORM_ID}
        />
      </div>
    </BottomNav>
  );
});

export const UpdateItemBottomNav = component$<Props>(({ form }) => {
  return (
    <BottomNav>
      <div q:slot={BOTTOM_NAVBAR_SLOTS.END}>
        <Button
          text="Update"
          isLoading={form?.submitting}
          disabled={form?.submitting}
          loadingText="Updating..."
          show={form?.dirty}
          type="submit"
          variant="success"
          form={ITEM_FORM_ID}
        />
      </div>
    </BottomNav>
  );
});
