import { Slot, component$ } from "@builder.io/qwik";
import type { Position } from "~/types";

type Props = {
  text: string | undefined;
  position?: Position;
};

export const Tooltip = component$<Props>(({ text, position = "bottom" }) => {
  if (!text) return <Slot />;
  return (
    <div class={`tooltip tooltip-${position}`} data-tip={text}>
      <Slot />
    </div>
  );
});
