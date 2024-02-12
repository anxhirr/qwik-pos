import { Slot, component$ } from "@builder.io/qwik";

type Props = {
  text: string | undefined;
};

export const Tooltip = component$<Props>(({ text }) => {
  if (!text) return <Slot />;
  return (
    <div class="tooltip" data-tip={text}>
      <Slot />
    </div>
  );
});
