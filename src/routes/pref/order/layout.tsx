import { Slot, component$ } from "@builder.io/qwik";
import { OrderPrefNavbar } from "~/components/navbar/OrderPrefNavbar";

export interface LayoutProps {}

export default component$<LayoutProps>(() => {
  return (
    <div class="flex h-full flex-col">
      <OrderPrefNavbar />
      <Slot />
    </div>
  );
});
