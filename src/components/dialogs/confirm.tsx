import { component$ } from "@builder.io/qwik";
import { Dialog, DialogBody, DialogFooter } from "./base";
import type { ConfirmDialogProps } from "../../../types";

interface Props extends ConfirmDialogProps {
  id: string;
  title: string;
  confirmText: string;
}

export const ConfirmDialogBase = component$<Props>(
  ({ id, show, hide, title, confirmText, onConfirm$, onCancel$ }) => {
    return (
      <Dialog id={id} show={show.value} hide={hide} title={title}>
        <DialogBody>{confirmText}</DialogBody>
        <DialogFooter useCloseButton={false}>
          <button class="btn btn-warning" onClick$={onConfirm$}>
            Yes
          </button>
          <button class="btn btn-success" onClick$={onCancel$}>
            No
          </button>
        </DialogFooter>
      </Dialog>
    );
  },
);
