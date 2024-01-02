import { Slot, component$ } from "@builder.io/qwik";
import { OrdersNavbar } from "~/components/navbar/OrdersNavbar";

export interface LayoutProps {}

export default component$<LayoutProps>(() => {
  return (
    <div class="flex h-full flex-col">
      <OrdersNavbar />
      <Slot />
    </div>
  );
});
