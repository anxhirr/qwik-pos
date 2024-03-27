import {
  component$,
  createContextId,
  Slot,
  useContext,
  useContextProvider,
  useStore,
} from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";
import Sidebar from "~/components/Sidebar";
import { Variant } from "~/types";

type Toast = {
  id: string;
  message: string;
  type: Variant;
};

type ToastsStore = {
  toasts: Toast[];
};

type UiStore = {
  theme: string;
  isSidebarOpen: boolean;
};

export const onRequest: RequestHandler = async () => {};

export const onGet: RequestHandler = async () => {};

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export const UiContext = createContextId<UiStore>("ui");

export const ToastsContext = createContextId<ToastsStore>("toasts");

export const useToastsContext = () => useContext(ToastsContext);
export const useUiContext = () => useContext(UiContext);

export default component$(() => {
  const uiStore = useStore<UiStore>({
    theme: "dark",
    isSidebarOpen: false,
  });
  useContextProvider(UiContext, uiStore);

  const toastsStore = useStore<ToastsStore>({
    toasts: [],
  });

  useContextProvider(ToastsContext, toastsStore);

  return (
    <>
      <main data-theme="pos" class="flex h-full">
        <div class="hidden md:block">
          <Sidebar />
        </div>

        {uiStore.isSidebarOpen && (
          // TODO: add transition
          <div class="md:hidden">
            <Sidebar />
          </div>
        )}
        <div class="h-full flex-1 overflow-y-auto">
          <Slot />
        </div>
      </main>

      {toastsStore.toasts.map((toast) => (
        <div key={toast.id} class="toast toast-start">
          <div class={`aler alert alert-${toast.type}`}>
            <span>{toast.message}</span>
          </div>
        </div>
      ))}
    </>
  );
});
