import { Slot, component$ } from "@builder.io/qwik";
import { OrdersNavbar } from "~/components/navbar/OrdersNavbar";
import { OrdersSubnav } from "~/components/subnav";

export interface LayoutProps {}

export default component$<LayoutProps>(() => {
  return (
    <div class="flex h-full flex-col">
      <OrdersNavbar />
      <OrdersSubnav />
      <Slot />
    </div>
  );
});
