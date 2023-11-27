import { $, component$, useSignal, useTask$ } from "@builder.io/qwik";
import type { SelectOption } from "../../../types";

export interface Props {
  value: string;
  options: SelectOption[];
  placeholder?: string;
  onSelect: (option: SelectOption) => void;
  onClear?: () => void;
}

export const CustomSelect = component$<Props>(
  ({ onSelect, placeholder = "Select", options, value }) => {
    const input = useSignal("");
    const showMenu = useSignal(false);

    const handleSelect = $((value: SelectOption) => {
      input.value = value.label;
      onSelect(value);
    });

    useTask$(({ track }) => {
      if (track(() => value)) {
        input.value = value;
      }
    });

    return (
      <div class="relative max-w-sm">
        <input
          type="text"
          placeholder={placeholder}
          value={input.value}
          class="input input-bordered w-full"
          onChange$={(ev) => (input.value = ev.target.value)}
          onFocus$={() => (showMenu.value = true)}
          onBlur$={() => setTimeout(() => (showMenu.value = false), 100)}
        />
        {showMenu.value && (
          <div class="absolute top-14 z-50 w-full bg-secondary-content">
            <ul>
              {options.map((item) => (
                <li
                  class="cursor-pointer rounded-md p-2 hover:bg-primary"
                  key={item.value}
                  onClick$={() => handleSelect(item)}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  },
);
