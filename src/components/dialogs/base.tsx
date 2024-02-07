import { Slot, component$ } from "@builder.io/qwik";
import { IcRoundClose } from "../icons";
import clsx from "clsx";
import { Button } from "../buttons/base";

type DialogProps = {
  id: string;
  show: boolean;
  hide: () => void;
  title: string;
  closeOnOutsideClick?: boolean;
  useCloseButton?: boolean;
};

export const Dialog = component$<DialogProps>(
  ({ id, hide, closeOnOutsideClick = true, show, title }) => {
    return (
      <dialog id={id} class="modal" open={show}>
        <div class="modal-box">
          <DialogHeader hide={hide} title={title} />
          <Slot />
        </div>

        {closeOnOutsideClick && <DialogBackdrop hide={hide} />}
      </dialog>
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
  hide: () => void;
};
export const DialogFooter = component$<DialogFooterProps>(
  ({ useCloseButton = true, hide }) => {
    return (
      <div class="modal-action">
        {useCloseButton && (
          <Button text="Close" variant="warning" onClick$={hide} />
        )}
        <Slot />
      </div>
    );
  },
);

type DialogBackdropProps = {
  hide: () => void;
};

const DialogBackdrop = component$<DialogBackdropProps>(({ hide }) => {
  return (
    <form method="dialog" class="modal-backdrop">
      <button onClick$={hide} />
    </form>
  );
});

type DialogHeaderProps = {
  useCloseButton?: boolean;
  title: string;
  hide: () => void;
};

const DialogHeader = component$<DialogHeaderProps>(
  ({ useCloseButton = true, hide, title }) => {
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
            <button class="btn btn-circle btn-ghost btn-sm" onClick$={hide}>
              <IcRoundClose />
            </button>
          </form>
        )}
      </div>
    );
  },
);
