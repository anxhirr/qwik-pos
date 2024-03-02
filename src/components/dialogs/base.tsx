import { Slot, component$ } from "@builder.io/qwik";
import { CloseIcon } from "../icons";
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

        <DialogBackdrop show={closeOnOutsideClick} hide={hide} />
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
          <Button
            text="Close"
            variant="warning"
            onClick$={hide}
            Icon={CloseIcon}
          />
        )}
        <Slot />
      </div>
    );
  },
);

type DialogBackdropProps = {
  hide: () => void;
  show: boolean;
};

const DialogBackdrop = component$<DialogBackdropProps>(({ hide, show }) => {
  if (!show) return null;
  return (
    // TODO: why do i need to add a harcoded bg-[#0006] here, isnt it already in the modal class?
    <form method="dialog" class="modal-backdrop bg-[#0006]">
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
            <Button
              variant="ghost"
              isCircle
              size="sm"
              onClick$={hide}
              Icon={CloseIcon}
            />
          </form>
        )}
      </div>
    );
  },
);
