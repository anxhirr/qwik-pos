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

export const CustomSelect = component$<Props>(
  ({ onSelect, placeholder = "Select", options, value, isMulti }) => {
    const input = useSignal("");
    const showMenu = useSignal(false);

    const selectedOptions = useSignal<CustomSelectOption[]>([
      { label: "test", value: "test" },
      { label: "test2", value: "test2" },
    ]);

    const visibleOptions = useSignal<CustomSelectOption[]>([]);

    const handleSelect = $((option: CustomSelectOption) => {
      console.log("handleSelect", option);

      onSelect(option); // emit event

      if (isMulti) {
        selectedOptions.value = [...selectedOptions.value, option];
        input.value = "";
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
      console.log("onClear", opt);
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

    return (
      <div class="relative">
        <div class="flex flex-wrap items-center overflow-hidden rounded-lg border border-base-content border-opacity-20">
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
      </div>
    );
  },
);

const MultiValue = component$<{ label: string; onClear: () => void }>(
  ({ label, onClear }) => {
    return (
      <div class="m-1 flex max-w-min items-center justify-between gap-2 rounded-lg bg-secondary text-sm">
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
