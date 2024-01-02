import { Slot, component$ } from "@builder.io/qwik";
import { ItemsNavbar } from "~/components/navbar/ItemsNavbar";

export interface LayoutProps {}

export default component$<LayoutProps>(() => {
  return (
    <div class="flex h-full flex-col">
      <ItemsNavbar />
      <Slot />
    </div>
  );
});
