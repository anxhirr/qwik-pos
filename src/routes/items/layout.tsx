import { Slot, component$ } from "@builder.io/qwik";
import { ItemsBottomNav } from "~/components/bottom-nav/item";
import { ItemsNavbar } from "~/components/navbar/ItemsNavbar";

export interface LayoutProps {}

export default component$<LayoutProps>(() => {
  return (
    <div class="flex h-full flex-col">
      <ItemsNavbar />
      <div class="flex-1">
        <Slot />
      </div>
      <ItemsBottomNav />
    </div>
  );
});
