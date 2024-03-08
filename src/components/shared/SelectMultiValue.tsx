import { component$ } from "@builder.io/qwik";
import { Button } from "../buttons";
import { CloseIcon } from "../icons";

export const SelectMultiValue = component$<{
  label: string;
  onRemove: () => void;
}>(({ label, onRemove: onClear }) => {
  return (
    <div class="flex max-w-min items-center justify-between gap-2 rounded-lg bg-secondary text-sm">
      <span class="whitespace-nowrap p-1 ps-2">{label}</span>
      <Button
        isCircle
        variant="ghost"
        size="xs"
        // class="btn-xs"
        Icon={CloseIcon}
        onClick$={onClear}
        tooltipText="Remove"
      />
    </div>
  );
});
