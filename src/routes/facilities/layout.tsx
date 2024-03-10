import { Slot, component$ } from "@builder.io/qwik";
import { FacilitiesNavbar } from "~/components/navbar/FacilitiesNavbar";

export interface LayoutProps {}

export default component$<LayoutProps>(() => {
  return (
    <div class="flex h-full flex-col">
      <FacilitiesNavbar />
      <Slot />
    </div>
  );
});
