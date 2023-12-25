import { Slot, component$ } from "@builder.io/qwik";
import { IcRoundClose } from "../../icons";
import clsx from "clsx";

type DialogProps = {
  id: string;
  closeOnOutsideClick?: boolean;
  useCloseButton?: boolean;
};

export const Dialog = component$<DialogProps>(
  ({ id, closeOnOutsideClick = true }) => {
    return (
      <dialog id={id} class="modal">
        <div class="modal-box">
          <Slot />
        </div>

        {closeOnOutsideClick && <DialogBackdrop />}
      </dialog>
    );
  },
);

type DialogHeaderProps = {
  useCloseButton?: boolean;
  title: string;
};

export const DialogHeader = component$<DialogHeaderProps>(
  ({ useCloseButton = true, title }) => {
    return (
      <div
        class={clsx(
          "modal-header mb-6",
          useCloseButton && "flex items-center justify-between",
        )}
      >
        <h3 class="text-lg font-bold">{title}</h3>
        {useCloseButton && (
          <form method="dialog">
            <button class="btn btn-circle btn-ghost btn-sm">
              <IcRoundClose />
            </button>
          </form>
        )}
      </div>
    );
  },
);

export const DialogBody = component$(() => {
  return (
    <div class="modal-body">
      <Slot />
    </div>
  );
});

type DialogFooterProps = {
  useCloseButton?: boolean;
};

export const DialogFooter = component$<DialogFooterProps>(
  ({ useCloseButton = true }) => {
    return (
      <div class="modal-action">
        {useCloseButton && (
          <form method="dialog">
            <button class="btn btn-warning">Close</button>
          </form>
        )}
        <Slot />
      </div>
    );
  },
);

const DialogBackdrop = component$(() => {
  return (
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  );
});
