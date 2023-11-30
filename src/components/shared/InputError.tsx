import { component$ } from "@builder.io/qwik";
import clsx from "clsx";

type Props = {
  name: string;
  error?: string;
};

export const InputError = component$(({ name, error }: Props) => {
  return (
    <div
      class={clsx(
        "!m-0 origin-top text-sm text-red-500 duration-200 md:text-base lg:text-lg",
        !error && "invisible h-0 -translate-y-2 scale-y-75 opacity-0",
      )}
      id={`${name}-error`}
      aria-hidden={!error}
    >
      {error}
    </div>
  );
});
