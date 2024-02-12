import type { Signal } from "@builder.io/qwik";
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
  isCreatable?: true;
  onCreate?: (option: CustomSelectOption) => void;
}

type selectHandler = {
  option: CustomSelectOption;
  parentEmitFn: (option: CustomSelectOption) => void;
};

export const CustomSelect = component$<Props>((props) => {
  const {
    onSelect,
    placeholder = "Select",
    options,
    value,
    isMulti = false,
    isCreatable = false,
    onCreate,
    onClear,
  } = props;
  const input = useSignal("");
  const showMenu = useSignal(false);

  const selectedOptions = useSignal<CustomSelectOption[]>([
    // { label: "test", value: "test" },
    // { label: "test2", value: "test2" },
  ]);

  const visibleOptions = useSignal<CustomSelectOption[]>([]);

  const noResultsFound = !visibleOptions.value.length;

  const clearSelectedOptions = $(() => (selectedOptions.value = []));
  const clearInput = $(() => (input.value = ""));

  const handleSelect = $(({ option, parentEmitFn }: selectHandler) => {
    parentEmitFn(option); // emit event

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
            class="input max-h-8 min-w-[10px] flex-1 !border-none p-0 !outline-none"
            onInput$={handleChange}
            onFocus$={() => (showMenu.value = true)}
            onBlur$={() => setTimeout(() => (showMenu.value = false), 100)}
          />
        </div>
        <div class="mx-1 flex items-center">
          <ClearButton input={input} onClear={handleClear} />
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
                  onSelect={$(() =>
                    handleSelect({ option: opt, parentEmitFn: onSelect }),
                  )}
                />
              ))}

              {noResultsFound && !isCreatable && (
                <li class="p-2 ps-4 text-sm text-base-content">
                  No results found
                </li>
              )}

              {isCreatable && noResultsFound && (
                <li
                  class="cursor-pointer rounded-md p-2 ps-4 hover:bg-info-content hover:text-primary"
                  onClick$={() =>
                    handleSelect({
                      option: { label: input.value, value: input.value },
                      parentEmitFn: onCreate, // TODO: remove warning
                    })
                  }
                >
                  Create "{input.value}"
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
});

const ClearButton = component$<{
  onClear: () => void;
  input: Signal<string>;
}>((props) => {
  if (!props.input.value) return null; // nothing to clear
  return (
    <button type="button" class="btn btn-ghost btn-xs" onClick$={props.onClear}>
      <IcRoundClose />
    </button>
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
        class="cursor-pointer rounded-md p-2 ps-4 hover:bg-accent hover:text-primary"
        onClick$={onSelect}
      >
        {label}
      </li>
    );
  },
);
