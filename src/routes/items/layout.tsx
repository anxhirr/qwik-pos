import { Slot, component$ } from "@builder.io/qwik";
import { ItemsNavbar } from "~/components/navbar/ItemsNavbar";

export interface LayoutProps {}

export default component$<LayoutProps>(() => {
  return (
    <div>
      <ItemsNavbar />
      <Slot />
    </div>
  );
});
