import { component$ } from "@builder.io/qwik";
import { BottomNav } from "../base";
import { BOTTOM_NAVBAR_SLOTS } from "~/constants/enum";
import { Button } from "~/components/buttons";
import { PlusIcon } from "~/components/icons";

type Props = {
  onCreateNew: () => void;
};

export const CategoriesBottomNav = component$<Props>(({ onCreateNew }) => {
  return (
    <BottomNav>
      <div q:slot={BOTTOM_NAVBAR_SLOTS.END}>
        <Button Icon={PlusIcon} text="Create Category" onClick$={onCreateNew} />
      </div>
    </BottomNav>
  );
});
