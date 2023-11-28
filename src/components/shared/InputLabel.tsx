import { component$ } from "@builder.io/qwik";

type Props = {
  name: string;
  label?: string;
  alt?: string;
  required?: boolean;
};

export const InputLabel = component$(
  ({ name, label, alt, required }: Props) => (
    <>
      {label && (
        <label class="label" for={name}>
          <span class="label-text relative">
            {label}

            {required && (
              <span class="absolute -right-3 top-0 text-red-600 dark:text-red-400">
                *
              </span>
            )}
          </span>
          <span class="label-text-alt">{alt}</span>
        </label>
      )}
    </>
  ),
);
