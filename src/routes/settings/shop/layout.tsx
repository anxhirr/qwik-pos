import { Slot, component$ } from "@builder.io/qwik";
import { ShopNavbar } from "~/components/navbar/ShopNavbar";

export interface LayoutProps {}

export default component$<LayoutProps>(() => {
  return (
    <div>
      <ShopNavbar />
      <Slot />
    </div>
  );
});
