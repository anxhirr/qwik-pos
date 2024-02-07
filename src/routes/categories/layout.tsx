import { Slot, component$ } from "@builder.io/qwik";
import { CategoriesNavbar } from "~/components/navbar/CategoriesNavbar";

export interface LayoutProps {}

export default component$<LayoutProps>(() => {
  return (
    <div class="flex h-full flex-col">
      <CategoriesNavbar />
      <Slot />
    </div>
  );
});
