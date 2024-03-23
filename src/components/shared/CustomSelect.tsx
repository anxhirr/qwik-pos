import type { PropFunction, Signal } from "@builder.io/qwik";
import {
  $,
  component$,
  useOnDocument,
  useSignal,
  useTask$,
} from "@builder.io/qwik";
import type { CustomSelectOption, SelectFnArgs } from "../../../types";
import { BackspaceFillIcon } from "../icons";
import { Button } from "../buttons";
import clsx from "clsx";

import { isString, isUndefined } from "~/utils";
import { SelectMultiValue } from "./SelectMultiValue";

type ParentEmitFn = PropFunction<
  ({ option, index, menuOptIdx }: SelectFnArgs) => Promise<string | undefined>
>;

type OnChangeFn = PropFunction<
  (
    options: CustomSelectOption[],
    //TODO: add CustomSelectOption
  ) => void
>;

export interface Props {
  options: CustomSelectOption[];
  onChange: OnChangeFn;

  initialvalue?: string | undefined;
  initialSelected?: CustomSelectOption[] | string[];
  placeholder?: string;
  onSelect?: ParentEmitFn;
  onClear?: () => void;
  onCreate?: ParentEmitFn;
  isMulti?: boolean;
  isCreatable?: true;
  fullWidth?: boolean;
  closeOnOutsideClick?: boolean;
}

const filterByInput = (options: CustomSelectOption[], value: string) => {
  return options.filter((item) =>
    item.label.toLowerCase().includes(value.toLowerCase()),
  );
};

const filterByOptions = (
  options: CustomSelectOption[],
  selectedOptions: CustomSelectOption[],
) => {
  const values = selectedOptions.map((opt) => opt.value);
  return options.filter((opt) => !values.includes(opt.value));
};

const getFilteredOptions = (
  options: CustomSelectOption[],
  selectedOptions: CustomSelectOption[],
  input: string,
) => {
  const inputFiltered = filterByInput(options, input);
  const finalOptions = filterByOptions(inputFiltered, selectedOptions);
  return finalOptions;
};

export const CustomSelect = component$<Props>((props) => {
  const {
    options,
    onChange,

    initialvalue,
    initialSelected: initialSelectedOptions,
    placeholder = "Select",
    onSelect,
    onClear,
    onCreate,
    isMulti,
    isCreatable,
    fullWidth,
    closeOnOutsideClick,
  } = props;
  const input = useSignal("");
  const showMenu = useSignal(false);
  const menuRef = useSignal<Element>();
  const inputRef = useSignal<Element>();
  const selectedOptions = useSignal<CustomSelectOption[]>([]);

  const possibleOptions = useSignal<CustomSelectOption[]>([]);
  const filteredOptions = getFilteredOptions(
    options,
    selectedOptions.value,
    input.value,
  );

  const loadingIdxs = useSignal<number[]>([]);

  const clearInput = $(() => (input.value = ""));
  const restoreOptions = $(() => (possibleOptions.value = options));
  const hideMenu = $(() => (showMenu.value = false));

  const addLoadingIdx = $(
    (idx: number) => (loadingIdxs.value = [...loadingIdxs.value, idx]),
  );
  const removeLoadingIdx = $(
    (idx: number) =>
      (loadingIdxs.value = loadingIdxs.value.filter((i) => i !== idx)),
  );

  const resolveCreatedOption = $(
    async ({ option, index, menuOptIdx }: SelectFnArgs) => {
      try {
        addLoadingIdx(index);
        const id = await onCreate?.({ option, index, menuOptIdx });
        if (!id) return;
        const newOption = { ...option, value: id };
        removeLoadingIdx(index);
        return newOption;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  );

  const handleSelect = $(
    async ({
      option,
      menuOptIdx,
    }: {
      option: CustomSelectOption;
      menuOptIdx: number;
      isCreate?: boolean;
    }) => {
      input.value = isMulti ? "" : option.label;
      hideMenu();

      const index = selectedOptions.value.length;

      const finalOption = isCreatable
        ? await resolveCreatedOption({ option, index, menuOptIdx })
        : option;

      if (!finalOption) return; // creation failed

      selectedOptions.value = isMulti
        ? [...selectedOptions.value, option]
        : [option];

      onChange(selectedOptions.value);
      onSelect?.({ option: finalOption, index, menuOptIdx });
    },
  );

  const handleChange = $((ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;
    input.value = value;
  });

  const handleClear = $(() => {
    clearInput();
    onClear?.();
  });

  // POPULATE INITIAL VALUES
  useTask$(({ track }) => {
    track(() => options);
    restoreOptions();
  });

  useTask$(({ track }) => {
    track(() => initialSelectedOptions);
    if (!initialSelectedOptions) return;

    const isArrayOfStrings = initialSelectedOptions.every(isString);

    if (isArrayOfStrings) {
      const newSelectedOptions = initialSelectedOptions.map((value) => {
        const option = options.find((opt) => opt.value === value); // find the label
        return option || { label: value, value: value };
      });
      selectedOptions.value = newSelectedOptions;
    } else {
      selectedOptions.value = initialSelectedOptions;
    }
  });

  useTask$(({ track }) => {
    track(() => initialvalue);
    if (isUndefined(initialvalue)) return;
    input.value = initialvalue;
  });

  return (
    <div class={clsx("relative", { "max-w-xs": !fullWidth })}>
      <div
        class={clsx(
          "min-h-12 h-full rounded-lg border border-base-content border-opacity-20 p-2",
        )}
      >
        <div class="flex w-full flex-wrap items-center gap-2 overflow-hidden">
          {isMulti && (
            <>
              {selectedOptions.value.map((opt) => (
                <SelectMultiValue
                  label={opt.label}
                  key={opt.value}
                  onRemove={$(() => {
                    selectedOptions.value = selectedOptions.value.filter(
                      (selectedOpt) => selectedOpt.value !== opt.value,
                    );
                    onChange(selectedOptions.value);
                  })}
                />
              ))}
            </>
          )}
          <div class="flex w-full justify-between">
            <Input
              input={input}
              onInput$={handleChange}
              placeholder={placeholder}
              showMenu={showMenu}
              menuRef={menuRef}
              inputRef={inputRef}
              closeOnOutsideClick={closeOnOutsideClick}
            />
            <ClearButton input={input} onClear={handleClear} />
          </div>
        </div>
      </div>
      {showMenu.value && (
        <div class="absolute top-[100%] z-50 w-full">
          <CustomSelectMenu
            options={filteredOptions}
            onSelect={$((option: CustomSelectOption, menuOptIdx: number) => {
              handleSelect({ option, menuOptIdx });
            })}
            onCreate={$((option: CustomSelectOption, menuOptIdx: number) => {
              handleSelect({ option, menuOptIdx });
            })}
            isCreatable={isCreatable}
            input={input.value}
            ref={menuRef}
          />
        </div>
      )}
    </div>
  );
});

type SelectHandler = (option: CustomSelectOption, menuOptIdx: number) => void;
export const CustomSelectMenu = component$<{
  options: CustomSelectOption[];
  onSelect: SelectHandler;
  onCreate?: SelectHandler;
  isCreatable?: boolean;
  input: string;
  ref: Signal<Element | undefined>;
}>(({ options, onSelect, isCreatable, input, onCreate, ref }) => {
  const noResultsFound = !options.length;

  return (
    <div ref={ref} class="rounded-lg bg-secondary">
      <ul>
        {options.map((opt, i) => (
          <Option
            key={opt.value}
            label={opt.label}
            onSelect={$(() => onSelect(opt, i))}
          />
        ))}

        {noResultsFound && (
          <>
            {isCreatable ? (
              <Option
                label={
                  input
                    ? `Create "${input}"`
                    : "No more results, type to create new"
                }
                onSelect={$(() => {
                  if (!input) return; // do nothing for the moment
                  const flyOpt = { label: input, value: input };
                  onCreate?.(flyOpt, 0);
                })}
              />
            ) : (
              <li class="p-2 ps-4 text-sm text-base-content">
                No results found
              </li>
            )}
          </>
        )}
      </ul>
    </div>
  );
});

const Input = component$<{
  input: Signal<string>;
  onInput$: (ev: Event) => void;
  placeholder: string;
  showMenu: Signal<boolean>;
  menuRef: Signal<Element | undefined>;
  inputRef: Signal<Element | undefined>;
  closeOnOutsideClick?: boolean;
}>(
  ({
    placeholder,
    input,
    onInput$,
    showMenu,
    menuRef,
    inputRef,
    closeOnOutsideClick = true,
  }) => {
    const onClickOutside = $(() => {
      if (closeOnOutsideClick) showMenu.value = false;
    });

    useOnDocument(
      "click",
      $((e) => {
        if (!menuRef.value || !inputRef.value) return;
        if (menuRef.value.contains(e.target as Node)) return;
        if (inputRef.value.contains(e.target as Node)) return;

        onClickOutside();
      }),
    );
    return (
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={input.value}
        class={clsx("input ms-2 max-h-8 flex-1 !border-none p-0 !outline-none")}
        onInput$={onInput$}
        onFocus$={() => (showMenu.value = true)}
      />
    );
  },
);

const ClearButton = component$<{
  onClear: () => void;
  input: Signal<string>;
}>((props) => {
  if (!props.input.value) return null; // nothing to clear
  return (
    <div class="mx-1 flex items-center">
      <Button
        isCircle
        variant="ghost"
        size="sm"
        Icon={BackspaceFillIcon}
        onClick$={props.onClear}
      />
    </div>
  );
});

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
