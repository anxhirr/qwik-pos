import { $, useStore } from "@builder.io/qwik";
import type { CRUDactions } from "../../../types";

export function useDialog<TForm extends Record<string, unknown>>(
  initialData: TForm,
) {
  const dialog = useStore<{
    show: boolean;
    mode: CRUDactions;
    formData: TForm;
  }>({
    show: false,
    mode: "CREATE",
    formData: initialData,
  });

  const showCreateDialog = $(() => {
    dialog.show = true;
    dialog.mode = "CREATE";
    dialog.formData = initialData;
  });

  const showUpdateDialog = $((data: TForm) => {
    dialog.show = true;
    dialog.mode = "UPDATE";
    dialog.formData = data;
  });

  const hideDialog = $(() => {
    dialog.show = false;
  });

  return {
    dialog,
    actions: {
      showCreateDialog,
      showUpdateDialog,
      hideDialog,
    },
  };
}
