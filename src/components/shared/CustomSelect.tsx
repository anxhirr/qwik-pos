import type { Signal } from "@builder.io/qwik";
import {
  $,
  component$,
  useOnDocument,
  useSignal,
  useTask$,
} from "@builder.io/qwik";
import type { CustomSelectOption } from "../../../types";
import { BackspaceFillIcon, CloseIcon } from "../icons";
import { Button } from "../buttons";
import clsx from "clsx";
import {
  Field,
  FieldArray,
  type FormStore,
  type ResponseData,
} from "@modular-forms/qwik";
import type { ItemFormType } from "~/types-and-validation";

type SelectHandler = (option: CustomSelectOption, index: number) => void;

export interface Props {
  value: string | undefined;
  options: CustomSelectOption[];
  placeholder?: string;
  onSelect: SelectHandler;
  onUnselect?: SelectHandler; // Add type for this, if isMulti, then this is required
  onClear?: () => void;
  isMulti?: boolean;
  isCreatable?: true;
  onCreate?: SelectHandler;
  initialSelectedOptions?: CustomSelectOption[];
  fullWidth?: boolean;
  form?: FormStore<ItemFormType, ResponseData>;
  closeOnOutsideClick?: boolean;
}

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
    initialSelectedOptions,
    fullWidth,
    form,
    onUnselect,
    closeOnOutsideClick,
  } = props;
  const input = useSignal("");
  const showMenu = useSignal(false);
  const menuRef = useSignal<Element>();
  const inputRef = useSignal<Element>();

  const selectedOptions = useSignal<CustomSelectOption[]>(
    initialSelectedOptions || [],
  );

  const filteredOptions = useSignal<CustomSelectOption[]>([]);

  const clearSelectedOptions = $(() => (selectedOptions.value = []));
  const clearInput = $(() => (input.value = ""));
  const revertVisibleOptions = $(() => (filteredOptions.value = options));
  const hideMenu = $(() => (showMenu.value = false));

  const updateMenuOptions = $(() => {
    if (!input.value && !selectedOptions.value.length) {
      revertVisibleOptions();
      return;
    }

    // remove selected options from visible options
    const possibleOptions = options.filter(
      (opt) => !selectedOptions.value.includes(opt),
    );

    // filter based on input
    const finalOptions = possibleOptions.filter((item) =>
      item.label.toLowerCase().includes(input.value.toLowerCase()),
    );

    filteredOptions.value = finalOptions;
  });

  const handleSelect = $(
    (
      option: CustomSelectOption,
      index: number,
      parentEmitFn: (option: CustomSelectOption, index: number) => void,
    ) => {
      parentEmitFn(option, index); // emit event

      if (isMulti) {
        selectedOptions.value = [...selectedOptions.value, option];
      }
      if (!isMulti) {
        input.value = option.label;
      }

      clearInput();
      hideMenu();
      updateMenuOptions();
    },
  );

  const handleUnselect = $((opt: CustomSelectOption, index: number) => {
    selectedOptions.value.splice(index, 1);
    updateMenuOptions();
    onUnselect?.(opt, index);
  });

  const handleChange = $((ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;
    input.value = value;

    updateMenuOptions();
  });

  const handleClear = $(() => {
    clearInput();
    clearSelectedOptions();
    onClear?.();
  });

  useTask$(({ track }) => {
    // populates initial options
    track(() => options);
    revertVisibleOptions();
  });

  useTask$(({ track }) => {
    track(() => value);

    if (!value) return;

    input.value = value;
  });

  return (
    <div class={clsx("relative", { "max-w-xs": !fullWidth })}>
      <div
        class={clsx(
          "min-h-12 flex h-full rounded-lg border border-base-content border-opacity-20 py-2",
        )}
      >
        {isMulti &&
          form && ( // TODO: add types for this. if isMulti and form is present
            <div class="flex flex-1 flex-wrap items-center overflow-hidden">
              <>
                <FieldArray of={form} name="categoryIDs">
                  {(fieldArray) => (
                    <>
                      {fieldArray.items.map((item, index) => {
                        const isLast = index === fieldArray.items.length - 1;

                        return (
                          <Field
                            key={item}
                            of={form}
                            name={`categoryIDs.${index}`}
                          >
                            {() => {
                              return isLast ? (
                                <>
                                  <Input
                                    input={input}
                                    onInput$={handleChange}
                                    placeholder={placeholder}
                                    selectedOptions={selectedOptions}
                                    showMenu={showMenu}
                                    menuRef={menuRef}
                                    inputRef={inputRef}
                                    closeOnOutsideClick={closeOnOutsideClick}
                                  />

                                  {showMenu.value && (
                                    <div class="absolute top-[100%] z-50 w-full">
                                      <Menu
                                        options={filteredOptions.value}
                                        onSelect={$(
                                          (option: CustomSelectOption) => {
                                            handleSelect(
                                              option,
                                              index,
                                              (option) =>
                                                onSelect(option, index),
                                            );
                                          },
                                        )}
                                        onCreate={$(
                                          (option: CustomSelectOption) => {
                                            handleSelect(
                                              option,
                                              index,
                                              (option) =>
                                                onCreate?.(option, index),
                                            );
                                          },
                                        )}
                                        isCreatable={isCreatable}
                                        input={input}
                                        ref={menuRef}
                                      />
                                    </div>
                                  )}
                                </>
                              ) : (
                                <MultiValue
                                  key={item}
                                  label={selectedOptions.value[index].label}
                                  onClear={$(() => {
                                    handleUnselect(
                                      selectedOptions.value[index],
                                      index,
                                    );
                                  })}
                                />
                              );
                            }}
                          </Field>
                        );
                      })}
                    </>
                  )}
                </FieldArray>
              </>
            </div>
          )}
        {!isMulti && (
          <>
            <Input
              input={input}
              onInput$={handleChange}
              placeholder={placeholder}
              selectedOptions={selectedOptions}
              showMenu={showMenu}
              menuRef={menuRef}
              inputRef={inputRef}
              closeOnOutsideClick={closeOnOutsideClick}
            />
            {showMenu.value && (
              <div class="absolute top-[100%] z-50 w-full">
                <Menu
                  options={filteredOptions.value}
                  onSelect={$((option: CustomSelectOption, index: number) => {
                    handleSelect(option, index, (option) =>
                      onSelect(option, index),
                    );
                  })}
                  onCreate={$((option: CustomSelectOption, index: number) => {
                    handleSelect(
                      option,
                      index,
                      (option) => onCreate?.(option, index),
                    );
                  })}
                  isCreatable={isCreatable}
                  input={input}
                  ref={menuRef}
                />
              </div>
            )}
          </>
        )}

        <div class="mx-1 flex items-center">
          <ClearButton input={input} onClear={handleClear} />
        </div>
      </div>
    </div>
  );
});

const Menu = component$<{
  options: CustomSelectOption[];
  onSelect: SelectHandler;
  onCreate?: SelectHandler;
  isCreatable?: boolean;
  input: Signal<string>;
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
                  input.value
                    ? `Create "${input.value}"`
                    : "No more results, type to create new"
                }
                onSelect={$(() => {
                  if (!input.value) return; // do nothing for the moment
                  const flyOpt = { label: input.value, value: input.value };
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
  selectedOptions: Signal<CustomSelectOption[]>;
  showMenu: Signal<boolean>;
  menuRef: Signal<Element | undefined>;
  inputRef: Signal<Element | undefined>;
  closeOnOutsideClick?: boolean;
}>(
  ({
    placeholder,
    input,
    onInput$,
    selectedOptions,
    showMenu,
    menuRef,
    inputRef,
    closeOnOutsideClick = true,
  }) => {
    const onClickOutside = $((e: Event) => {
      console.log("clicked outside element", e);
      if (closeOnOutsideClick) showMenu.value = false;
    });

    useOnDocument(
      "click",
      $((e) => {
        if (!menuRef.value || !inputRef.value) return;
        if (menuRef.value.contains(e.target as Node)) return;
        if (inputRef.value.contains(e.target as Node)) return;

        onClickOutside(e);
      }),
    );
    return (
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={input.value}
        class={clsx(
          "input max-h-8 min-w-[10px] flex-1 !border-none p-0 !outline-none",
          selectedOptions.value.length ? "ps-2" : "ps-4",
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
    <Button
      isCircle
      variant="ghost"
      size="sm"
      Icon={BackspaceFillIcon}
      onClick$={props.onClear}
    />
  );
});

const MultiValue = component$<{ label: string; onClear: () => void }>(
  ({ label, onClear }) => {
    return (
      <div class="ms-2 flex max-w-min items-center justify-between gap-2 rounded-lg bg-secondary text-sm">
        <span class="whitespace-nowrap p-1 ps-2">{label}</span>
        <Button
          isCircle
          variant="ghost"
          size="xs"
          Icon={CloseIcon}
          onClick$={onClear}
          tooltipText="Remove"
        />
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
