import type { Signal } from "@builder.io/qwik";
import { $, component$, useSignal, useTask$ } from "@builder.io/qwik";
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
  onUnselect: SelectHandler;
  onClear?: () => void;
  isMulti?: boolean;
  isCreatable?: true;
  onCreate?: SelectHandler;
  initialSelectedOptions?: CustomSelectOption[];
  fullWidth?: boolean;
  form: FormStore<ItemFormType, ResponseData>;
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
  } = props;
  const input = useSignal("");
  const showMenu = useSignal(false);
  const menuRef = useSignal<Element>();

  const selectedOptions = useSignal<CustomSelectOption[]>(
    initialSelectedOptions || [],
  );

  const filteredOptions = useSignal<CustomSelectOption[]>([]);

  const noResultsFound = !filteredOptions.value.length;

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

  const afterOptionSelect = $(() => {
    clearInput();
    updateMenuOptions();
    hideMenu();
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

      afterOptionSelect();
    },
  );

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

  const handleUnselect = $((opt: CustomSelectOption, index: number) => {
    selectedOptions.value.splice(index, 1);
    onUnselect(opt, index);
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

  const closeOnBlur = $(() => {
    // close menu if focus is outside of menu and input
    const isAtMenu = !menuRef.value?.contains(document.activeElement);
    if (isAtMenu) return;
    hideMenu();
  });

  return (
    <div class={clsx("relative", { "max-w-xs": !fullWidth })}>
      <div
        class={clsx(
          "min-h-12 flex h-full rounded-lg border border-base-content border-opacity-20 py-2",
        )}
      >
        <div class="flex flex-1 flex-wrap items-center overflow-hidden">
          {isMulti && (
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
                                <input
                                  type="text"
                                  placeholder={placeholder}
                                  value={input.value}
                                  class={clsx(
                                    "input max-h-8 min-w-[10px] flex-1 !border-none p-0 !outline-none",
                                    selectedOptions.value.length
                                      ? "ps-2"
                                      : "ps-4",
                                  )}
                                  onInput$={handleChange}
                                  onFocus$={() => (showMenu.value = true)}
                                  onBlur$={closeOnBlur}
                                />
                                {showMenu.value && (
                                  <div
                                    ref={menuRef}
                                    class="absolute top-[100%] z-50 w-full"
                                  >
                                    <div class="mt-1 rounded-lg bg-secondary">
                                      <ul>
                                        {filteredOptions.value.map((opt) => (
                                          <Option
                                            key={opt.value}
                                            label={opt.label}
                                            onSelect={$(() =>
                                              handleSelect(
                                                opt,
                                                index,
                                                (option) =>
                                                  onSelect(option, index),
                                              ),
                                            )}
                                          />
                                        ))}

                                        {noResultsFound && !isCreatable && (
                                          <li class="p-2 ps-4 text-sm text-base-content">
                                            No results found
                                          </li>
                                        )}

                                        {isCreatable && noResultsFound && (
                                          <Option
                                            label={
                                              input.value
                                                ? `Create "${input.value}"`
                                                : "No more results, type to create new"
                                            }
                                            onSelect={$(() => {
                                              if (!input.value) return; // do nothing for the moment
                                              handleSelect(
                                                {
                                                  label: input.value,
                                                  value: input.value,
                                                },
                                                index,
                                                (option) =>
                                                  onCreate?.(option, index),
                                              );
                                            })}
                                          />
                                        )}
                                      </ul>
                                    </div>
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
          )}
        </div>
        <div class="mx-1 flex items-center">
          <ClearButton input={input} onClear={handleClear} />
        </div>
      </div>
    </div>
  );
});

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
