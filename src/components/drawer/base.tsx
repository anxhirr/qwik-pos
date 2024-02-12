import { Slot, component$ } from "@builder.io/qwik";
import clsx from "clsx";
import { IcRoundClose } from "../icons";

type DrawerProps = {
  show: boolean;
  hide: () => void;
  title: string;
  closeOnOutsideClick?: boolean;
  position?: "start" | "end";
};

export const Drawer = component$<DrawerProps>(
  ({ hide, closeOnOutsideClick = true, show, title, position = "start" }) => {
    return (
      <div class={clsx("drawer", `drawer-${position}`)}>
        <input type="checkbox" checked={show} class="drawer-toggle" />
        <div class="drawer-side">
          <DrawerBackdrop hide={hide} show={closeOnOutsideClick} />

          <div class="menu min-h-full w-80 bg-base-200 p-4 text-base-content">
            <DrawerHeader hide={hide} title={title} />
            <Slot />
          </div>
        </div>
      </div>
    );
  },
);

type DrawerBackdropProps = {
  hide: () => void;
  show: boolean;
};

const DrawerBackdrop = component$<DrawerBackdropProps>(({ hide, show }) => {
  if (!show) return null;
  return (
    <div aria-label="close sidebar" class="drawer-overlay" onClick$={hide} />
  );
});

type DrawerHeaderProps = {
  useCloseButton?: boolean;
  title: string;
  hide: () => void;
};
const DrawerHeader = component$<DrawerHeaderProps>(
  ({ useCloseButton = true, hide, title }) => {
    return (
      <div
        class={clsx(
          "drawer-header mb-4",
          useCloseButton && "flex items-center justify-between",
        )}
      >
        <h3 class="text-lg font-bold">{title}</h3>
        {useCloseButton && (
          <button
            type="button"
            aria-label="close sidebar"
            class="btn btn-circle btn-ghost btn-sm"
            onClick$={hide}
          >
            <IcRoundClose />
          </button>
        )}
      </div>
    );
  },
);
