import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { IcRoundPlus } from "~/components/icons";
import { BottomNav } from "./base";
import { BOTTOM_NAVBAR_SLOTS } from "~/constants/enum";
import type { FormStore, ResponseData } from "@modular-forms/qwik";
import type { ItemFormType } from "~/types-and-validation/itemSchema";
import { Button } from "../buttons";

export const ItemsBottomNav = component$(() => {
  return (
    <BottomNav>
      <div q:slot={BOTTOM_NAVBAR_SLOTS.END}>
        <Link href="/items/new">
          <button class="btn btn-secondary" type="submit">
            <IcRoundPlus />
            New Item
          </button>
        </Link>
      </div>
    </BottomNav>
  );
});

type Props = {
  form?: FormStore<ItemFormType, ResponseData>;
};

export const NewItemBottomNav = component$<Props>(({ form }) => {
  return (
    <BottomNav>
      <div q:slot={BOTTOM_NAVBAR_SLOTS.END}>
        <Button
          text="Save"
          isLoading={form?.submitting}
          disabled={form?.submitting}
          loadingText="Saving..."
          show={form?.dirty}
          type="submit"
          variant="success"
        />
      </div>
    </BottomNav>
  );
});
