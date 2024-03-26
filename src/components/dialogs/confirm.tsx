import { component$ } from "@builder.io/qwik";
import { Dialog, DialogBody, DialogFooter } from "./base";
import type { ConfirmDialogProps } from "../../../types";
import { Button } from "../buttons";
import { CheckIcon, CloseIcon } from "../icons";

interface Props extends ConfirmDialogProps {
  id: string;
  title: string;
  confirmText: string;
}

export const ConfirmDialogBase = component$<Props>(
  ({ id, show, hide, title, confirmText, onConfirm$, onCancel$ }) => {
    return (
      <Dialog id={id} show={show} hide={hide} title={title}>
        <DialogBody>{confirmText}</DialogBody>
        <DialogFooter hide={hide} useCloseButton={false}>
          <Button
            text="Yes"
            variant="warning"
            onClick$={onConfirm$}
            Icon={CheckIcon}
          />
          <Button
            text="No"
            variant="success"
            onClick$={onCancel$}
            Icon={CloseIcon}
          />
        </DialogFooter>
      </Dialog>
    );
  },
);
