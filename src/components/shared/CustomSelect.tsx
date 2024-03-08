import type { Signal } from "@builder.io/qwik";
import {
  $,
  Slot,
  component$,
  useOnDocument,
  useSignal,
  useTask$,
} from "@builder.io/qwik";
import type {
  CustomSelectOption,
  CustSelectParentEmitFnArgs,
} from "../../../types";
import { BackspaceFillIcon } from "../icons";
import { Button } from "../buttons";
import clsx from "clsx";

import { isUndefined } from "~/utils";

type SelectHandler = (option: CustomSelectOption, menuOptIdx: number) => void;
type ParentEmitFn = (args: CustSelectParentEmitFnArgs) => void;

export interface Props {
  value: string | undefined;
  options: CustomSelectOption[];
  placeholder?: string;
  onSelect: ParentEmitFn;
  onClear?: () => void;
  isMulti?: boolean;
  isCreatable?: true;
  onCreate?: ParentEmitFn;
  fullWidth?: boolean;
  closeOnOutsideClick?: boolean;
  selectedOptions?: CustomSelectOption[];
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
    onSelect,
    placeholder = "Select",
    options,
    value,
    isMulti,
    isCreatable,
    onCreate,
    onClear,
    fullWidth,
    closeOnOutsideClick,
    selectedOptions = [],
  } = props;
  const input = useSignal("");
  const showMenu = useSignal(false);
  const menuRef = useSignal<Element>();
  const inputRef = useSignal<Element>();

  const possibleOptions = useSignal<CustomSelectOption[]>([]);
  const filteredOptions = getFilteredOptions(
    options,
    selectedOptions,
    input.value,
  );

  const clearInput = $(() => (input.value = ""));
  const revertPossibleOptions = $(() => (possibleOptions.value = options));
  const hideMenu = $(() => (showMenu.value = false));

  const handleSelect = $(
    (
      option: CustomSelectOption,
      menuOptIdx: number,
      parentEmitFn: ParentEmitFn,
    ) => {
      if (!isMulti) input.value = option.label;

      clearInput();
      hideMenu();

      parentEmitFn({
        newOpt: option,
        menuOptIdx,
      });
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

  useTask$(({ track }) => {
    // populates initial options
    track(() => options);
    revertPossibleOptions();
  });

  useTask$(({ track }) => {
    track(() => value);
    if (isUndefined(value)) return;
    input.value = value;
  });

  return (
    <div class={clsx("relative", { "max-w-xs": !fullWidth })}>
      <div
        class={clsx(
          "min-h-12 flex h-full rounded-lg border border-base-content border-opacity-20 p-2",
        )}
      >
        {isMulti && (
          <div class="flex flex-wrap items-center gap-2 overflow-hidden">
            <Slot />
          </div>
        )}
        <>
          <Input
            input={input}
            onInput$={handleChange}
            placeholder={placeholder}
            showMenu={showMenu}
            menuRef={menuRef}
            inputRef={inputRef}
            closeOnOutsideClick={closeOnOutsideClick}
          />
        </>

        <ClearButton input={input} onClear={handleClear} />
      </div>
      {showMenu.value && (
        <div class="absolute top-[100%] z-50 w-full">
          <CustomSelectMenu
            options={filteredOptions}
            onSelect={$((option: CustomSelectOption, menuOptIdx: number) => {
              handleSelect(option, menuOptIdx, onSelect);
            })}
            onCreate={$((option: CustomSelectOption, menuOptIdx: number) => {
              handleSelect(option, menuOptIdx, onCreate as ParentEmitFn);
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
        class={clsx(
          "input ms-2 max-h-8 min-w-[10px] flex-1 !border-none p-0 !outline-none",
        )}
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
