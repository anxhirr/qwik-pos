import { component$ } from "@builder.io/qwik";
import { Dialog, DialogBody, DialogFooter } from "./base";
import type { ConfirmDialogProps } from "../../../types";
import { Button } from "../buttons";
import { CheckIcon, CloseIcon, ThumbDownIcon, ThumbUpIcon } from "../icons";

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
