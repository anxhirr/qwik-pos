import type { Signal } from "@builder.io/qwik";
import {
  $,
  component$,
  useOnDocument,
  useSignal,
  useTask$,
} from "@builder.io/qwik";
import type {
  CustomSelectOption,
  CustSelectParentEmitFnArgs,
} from "../../../types";
import { BackspaceFillIcon, CloseIcon } from "../icons";
import { Button } from "../buttons";
import clsx from "clsx";
import type {
  FieldArrayPath,
  FieldArrayStore,
  FormStore,
  ResponseData,
} from "@modular-forms/qwik";
import {
  Field,
  FieldArray,
  getValues,
  insert,
  remove,
  setValues,
} from "@modular-forms/qwik";
import { isUndefined } from "~/utils";
import type { ItemFormType } from "~/types-and-validation";

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
  initialSelectedOptions?: CustomSelectOption[];
  fullWidth?: boolean;
  closeOnOutsideClick?: boolean;
  form: FormStore<ItemFormType, ResponseData>;
  fieldArrayName: FieldArrayStore<
    ItemFormType,
    FieldArrayPath<ItemFormType>
  >["name"];
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
  const possibleOptions = filterByInput(options, input);
  const finalOptions = filterByOptions(possibleOptions, selectedOptions);
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
    form,
    fieldArrayName,
  } = props;
  const input = useSignal("");
  const showMenu = useSignal(false);
  const menuRef = useSignal<Element>();
  const inputRef = useSignal<Element>();

  const selectedOptions = getValues(
    form,
    "categories",
  )! as CustomSelectOption[];

  const possibleOptions = useSignal<CustomSelectOption[]>([]);

  const clearInput = $(() => (input.value = ""));
  const revertPossibleOptions = $(() => (possibleOptions.value = options));
  const hideMenu = $(() => (showMenu.value = false));

  const filteredOptions = getFilteredOptions(
    options,
    selectedOptions,
    input.value,
  );

  const handleSelect = $(
    (
      option: CustomSelectOption,
      menuOptIdx: number,
      parentEmitFn: ParentEmitFn,
    ) => {
      if (isMulti)
        insert(form, fieldArrayName, {
          at: selectedOptions.length,
          value: option,
        });

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
    setValues(form, fieldArrayName, []);
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
            <FieldArray of={form} name={fieldArrayName}>
              {(fieldArray) => (
                <>
                  {fieldArray.items.map((item, index) => {
                    return (
                      <div key={item}>
                        <Field of={form} name={`categories.${index}.label`}>
                          {(field) => (
                            <MultiValue
                              label={field.value as string}
                              onRemove={$(() => {
                                remove(form, "categories", {
                                  at: index,
                                });
                              })}
                            />
                          )}
                        </Field>
                        <Field of={form} name={`categories.${index}.value`}>
                          {() => <></>}
                          {/* just to get value to be tracked */}
                        </Field>
                      </div>
                    );
                  })}
                </>
              )}
            </FieldArray>
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
          <Menu
            options={filteredOptions}
            onSelect={$((option: CustomSelectOption, menuOptIdx: number) => {
              handleSelect(option, menuOptIdx, onSelect);
            })}
            onCreate={$((option: CustomSelectOption, menuOptIdx: number) => {
              handleSelect(option, menuOptIdx, onCreate as ParentEmitFn);
            })}
            isCreatable={isCreatable}
            input={input}
            ref={menuRef}
          />
        </div>
      )}
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

const MultiValue = component$<{ label: string; onRemove: () => void }>(
  ({ label, onRemove: onClear }) => {
    return (
      <div class="flex max-w-min items-center justify-between gap-2 rounded-lg bg-secondary text-sm">
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
