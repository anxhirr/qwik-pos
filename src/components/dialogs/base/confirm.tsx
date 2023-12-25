import { component$ } from "@builder.io/qwik";
import { Dialog, DialogBody, DialogFooter, DialogHeader } from "./base";

type Props = {
  id: string;
  title: string;
  confirmText: string;
  onConfirm$: () => void;
  onCancel$: () => void;
};
export const ConfirmDialogBase = component$<Props>(
  ({ id, title, confirmText, onConfirm$, onCancel$ }) => {
    return (
      <Dialog id={id}>
        <DialogHeader title={title} />
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
