import { Slot, component$ } from "@builder.io/qwik";
import { ItemsNavbar } from "~/components/navbar/ItemsNavbar";
import { ItemsSubnav } from "~/components/subnav";

export interface LayoutProps {}

export default component$<LayoutProps>(() => {
  return (
    <div class="flex h-full flex-col">
      <ItemsNavbar />
      <ItemsSubnav />
      <Slot />
    </div>
  );
});
