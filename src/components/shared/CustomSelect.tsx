import { $, component$, useSignal, useTask$ } from "@builder.io/qwik";
import type { CustomSelectOption } from "../../../types";

export interface Props {
  value: string | undefined;
  options: CustomSelectOption[];
  placeholder?: string;
  onSelect: (option: CustomSelectOption) => void;
  onClear?: () => void;
}

export const CustomSelect = component$<Props>(
  ({ onSelect, placeholder = "Select", options, value }) => {
    const input = useSignal("");
    const showMenu = useSignal(false);

    const handleSelect = $((value: CustomSelectOption) => {
      input.value = value.label;
      onSelect(value);
    });

    useTask$(({ track }) => {
      track(() => value);

      if (!value) return;

      input.value = value;
    });

    return (
      <div class="relative">
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
          <div class="absolute top-14 z-50 w-full bg-secondary">
            <ul>
              {options.map((item) => (
                <li
                  class="cursor-pointer rounded-md p-2 hover:bg-info"
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
