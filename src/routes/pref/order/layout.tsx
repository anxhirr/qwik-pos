import { Slot, component$ } from "@builder.io/qwik";
import { OrderPrefNavbar } from "~/components/navbar/OrderPrefNavbar";

export interface LayoutProps {}

export default component$<LayoutProps>(() => {
  return (
    <div>
      <OrderPrefNavbar />
      <Slot />
      {/* <ShopActionBar /> */}
    </div>
  );
});
