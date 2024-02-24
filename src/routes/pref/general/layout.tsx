import { Slot, component$ } from "@builder.io/qwik";
import { GeneralPrefNavbar } from "~/components/navbar/GeneralPrefNavbar";

export interface LayoutProps {}

export default component$<LayoutProps>(() => {
  return (
    <div class="flex h-full flex-col">
      <GeneralPrefNavbar />
      <Slot />
    </div>
  );
});
