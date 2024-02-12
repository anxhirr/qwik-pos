import { Slot, component$ } from "@builder.io/qwik";

type Props = {
  text: string | undefined;
};

export const Indicator = component$<Props>(({ text }) => {
  if (!text) return <Slot />;
  return (
    <div class="indicator">
      <Slot />
      <span class="badge indicator-item badge-accent badge-xs">{text}</span>
    </div>
  );
});
