import { Slot, component$ } from "@builder.io/qwik";
import { BOTTOM_NAVBAR_SLOTS } from "~/constants/enum";

type Props = {};

export const BottomNav = component$<Props>(() => {
  return (
    <div class="navbar bg-base-100">
      <div class="navbar-start">
        <Slot name={BOTTOM_NAVBAR_SLOTS.START} />
      </div>
      <div class="navbar-center">
        <Slot name={BOTTOM_NAVBAR_SLOTS.CENTER} />
      </div>
      <div class="navbar-end">
        <Slot name={BOTTOM_NAVBAR_SLOTS.END} />
      </div>
    </div>
  );
});
