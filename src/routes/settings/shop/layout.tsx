import { Slot, component$ } from "@builder.io/qwik";
// import { ShopActionBar } from "~/components/bottom-nav/shop";
import { ShopNavbar } from "~/components/navbar/ShopNavbar";

export interface LayoutProps {}

export default component$<LayoutProps>(() => {
  return (
    <div>
      <ShopNavbar />
      <Slot />
      {/* <ShopActionBar /> */}
    </div>
  );
});
