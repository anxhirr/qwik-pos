import { $, useStore, useTask$ } from "@builder.io/qwik";
import type { CRUDactions } from "../../../types";
import { useLocation, useNavigate } from "@builder.io/qwik-city";

export function useDialog<
  TForm extends Record<string, unknown>,
  TData extends Record<string, unknown>[],
>({
  formData,
  data,
  saveInURL = true,
  openBasedOnURL = true,
}: {
  formData: TForm;
  data?: TData;
  saveInURL?: boolean;
  openBasedOnURL?: boolean;
}) {
  const loc = useLocation();
  const nav = useNavigate();
  const { pathname } = loc.url;

  const dialog = useStore<{
    show: boolean;
    mode: CRUDactions;
    formData: TForm;
  }>({
    show: false,
    mode: "CREATE",
    formData: formData,
  });

  const showCreateDialog = $(() => {
    dialog.show = true;
    dialog.mode = "CREATE";
    dialog.formData = formData;

    if (!saveInURL) return;

    const searchParams = new URLSearchParams({
      create: "yes",
    });
    nav(`${pathname}?${searchParams.toString()}`); // TODO: check if this will merge with existing query params
  });

  const showUpdateDialog = $((id: string, data: TForm) => {
    dialog.show = true;
    dialog.mode = "UPDATE";
    dialog.formData = data;

    if (!saveInURL) return;

    const searchParams = new URLSearchParams({
      update: id,
    });
    nav(`${pathname}?${searchParams.toString()}`); // TODO: check if this will merge with existing query params
  });

  const hideDialog = $(() => {
    dialog.show = false;

    if (!saveInURL) return;

    const searchParams = new URLSearchParams();
    nav(`${pathname}?${searchParams.toString()}`); // TODO: check if this will clear the other query params
  });

  useTask$(() => {
    if (!openBasedOnURL) return;
    const { searchParams } = loc.url;

    const update = searchParams.get("update");

    if (searchParams.get("create") === "yes") showCreateDialog();

    if (update) {
      const item = data?.find((c) => c.id === update) as TForm | undefined; // TODO: check if this is the correct type
      if (!item) return;
      showUpdateDialog(update, item);
    }
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
