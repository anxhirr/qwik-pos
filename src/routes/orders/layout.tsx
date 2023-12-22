import { Slot, component$ } from "@builder.io/qwik";
import { ReceiptDialog } from "~/components/dialogs/ReceiptDialog";
import { OrdersNavbar } from "~/components/navbar/OrdersNavbar";

export interface LayoutProps {}

export default component$<LayoutProps>(() => {
  return (
    <div>
      <OrdersNavbar />
      <Slot />

      <ReceiptDialog />
    </div>
  );
});
