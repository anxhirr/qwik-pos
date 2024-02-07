import { component$ } from "@builder.io/qwik";
import { BottomNav } from "../base";
import { BOTTOM_NAVBAR_SLOTS } from "~/constants/enum";
import { Button } from "~/components/buttons";

type Props = {
  onCreateNew: () => void;
};

export const CategoriesBottomNav = component$<Props>(({ onCreateNew }) => {
  return (
    <BottomNav>
      <div q:slot={BOTTOM_NAVBAR_SLOTS.END}>
        <Button text="New Category" onClick$={onCreateNew} />
      </div>
    </BottomNav>
  );
});
