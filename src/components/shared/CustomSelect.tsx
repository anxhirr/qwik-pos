import { $, component$, useSignal, useTask$ } from "@builder.io/qwik";
import type { CustomSelectOption } from "../../../types";
import { IcRoundClose } from "../icons";

export interface Props {
  value: string | undefined;
  options: CustomSelectOption[];
  placeholder?: string;
  onSelect: (option: CustomSelectOption) => void;
  onClear?: () => void;
  isMulti?: boolean;
}

export const CustomSelect = component$<Props>((props) => {
  const {
    onSelect,
    placeholder = "Select",
    options,
    value,
    isMulti,
    onClear,
  } = props;
  const input = useSignal("");
  const showMenu = useSignal(false);

  const selectedOptions = useSignal<CustomSelectOption[]>([
    { label: "test", value: "test" },
    { label: "test2", value: "test2" },
  ]);

  const visibleOptions = useSignal<CustomSelectOption[]>([]);

  const clearSelectedOptions = $(() => (selectedOptions.value = []));
  const clearInput = $(() => (input.value = ""));

  const handleSelect = $((option: CustomSelectOption) => {
    onSelect(option); // emit event

    if (isMulti) {
      selectedOptions.value = [...selectedOptions.value, option];
      clearInput();
      return;
    }

    input.value = option.label;
  });

  useTask$(({ track }) => {
    track(() => options);
    visibleOptions.value = options;
  });

  useTask$(({ track }) => {
    track(() => value);

    if (!value) return;

    input.value = value;
  });

  const onUnselect = $((opt: CustomSelectOption) => {
    selectedOptions.value = selectedOptions.value.filter(
      (item) => item.value !== opt.value,
    );
  });

  const handleChange = $((ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;
    console.log("handleChange", value);
    input.value = value;

    // filter options
    if (!value) {
      visibleOptions.value = options;
      return;
    }

    const filteredOptions = options.filter((item) =>
      item.label.toLowerCase().includes(value.toLowerCase()),
    );

    visibleOptions.value = filteredOptions;
  });

  const handleClear = $(() => {
    console.log("handleClear");
    clearInput();
    clearSelectedOptions();
    onClear?.();
  });

  return (
    <div class="relative">
      <div class="min-h-12 flex h-full rounded-lg border border-base-content border-opacity-20 py-2 ps-4">
        <div class="flex flex-1 flex-wrap items-center gap-1 overflow-hidden">
          {isMulti && (
            <>
              {selectedOptions.value.map((opt) => (
                <MultiValue
                  key={opt.value}
                  label={opt.label}
                  onClear={$(() => onUnselect(opt))}
                />
              ))}
            </>
          )}
          <input
            type="text"
            placeholder={placeholder}
            value={input.value}
            class="input max-h-8 min-w-[10px] flex-1 p-0 !outline-none"
            onInput$={handleChange}
            onFocus$={() => (showMenu.value = true)}
            onBlur$={() => setTimeout(() => (showMenu.value = false), 100)}
          />
        </div>
        <div class="mx-1 flex items-center">
          <button
            type="button"
            class="btn btn-ghost btn-sm px-1"
            onClick$={handleClear}
          >
            <IcRoundClose />
          </button>
        </div>
      </div>
      {showMenu.value && (
        <div class="absolute top-[100%] z-50 w-full">
          <div class="mt-1 rounded-lg bg-secondary">
            <ul>
              {visibleOptions.value.map((opt) => (
                <Option
                  key={opt.value}
                  label={opt.label}
                  onSelect={$(() => handleSelect(opt))}
                />
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
});

const MultiValue = component$<{ label: string; onClear: () => void }>(
  ({ label, onClear }) => {
    return (
      <div class="flex max-w-min items-center justify-between gap-2 rounded-lg bg-secondary text-sm">
        <span class="p-1 ps-2">{label}</span>
        <button type="button" class="btn btn-ghost btn-xs" onClick$={onClear}>
          <IcRoundClose />
        </button>
      </div>
    );
  },
);

const Option = component$<{ label: string; onSelect: () => void }>(
  ({ label, onSelect }) => {
    return (
      <li
        class="cursor-pointer rounded-md p-2 hover:bg-info"
        onClick$={onSelect}
      >
        {label}
      </li>
    );
  },
);
