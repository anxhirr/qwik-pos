import type { QRL } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { BottomNav } from "./base";
import { BOTTOM_NAVBAR_SLOTS, ITEM_FORM_ID } from "~/constants/enum";
import type { FormStore, ResponseData } from "@modular-forms/qwik";
import type { ItemFormType } from "~/validation/itemSchema";
import { Button } from "../buttons";
import { DeleteIcon, PlusIcon } from "../icons";
import { CreateBtn, UpdateBtn } from "../buttons/common";

type Props = {
  form?: FormStore<ItemFormType, ResponseData>;
};

export const ItemsBottomNav = component$(() => {
  return (
    <BottomNav>
      <div q:slot={BOTTOM_NAVBAR_SLOTS.END}>
        <Link href="/items/create">
          <Button text="Create Item" Icon={PlusIcon} variant="success" />
        </Link>
      </div>
    </BottomNav>
  );
});

export const CreateItemBottomNav = component$<Props>(({ form }) => {
  return (
    <BottomNav>
      <div q:slot={BOTTOM_NAVBAR_SLOTS.END}>
        <CreateBtn
          submitting={form?.submitting}
          dirty={form?.dirty}
          formId={ITEM_FORM_ID}
        />
      </div>
    </BottomNav>
  );
});

export const UpdateItemBottomNav = component$<Props>(({ form }) => {
  return (
    <BottomNav>
      <div q:slot={BOTTOM_NAVBAR_SLOTS.END}>
        <UpdateBtn
          submitting={form?.submitting}
          dirty={form?.dirty}
          formId={ITEM_FORM_ID}
        />
      </div>
    </BottomNav>
  );
});

export const ItemsListBottomNav = component$<{
  onDeleteClick$: QRL<() => void>;
  showDeleteBtn?: boolean;
}>(({ onDeleteClick$, showDeleteBtn = true }) => {
  return (
    <BottomNav>
      <div q:slot={BOTTOM_NAVBAR_SLOTS.END}>
        <Button
          show={showDeleteBtn}
          Icon={DeleteIcon}
          text="Bulk Delete"
          onClick$={onDeleteClick$}
        />
      </div>
    </BottomNav>
  );
});
