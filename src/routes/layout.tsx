import {
  component$,
  createContextId,
  Slot,
  useContextProvider,
  useStore,
} from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";
import Sidebar from "~/components/Sidebar";

export const onRequest: RequestHandler = async () => {};

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export const UiContext = createContextId<{
  theme: string;
  isSidebarOpen: boolean;
}>("ui");

export default component$(() => {
  const uiStore = useStore({
    theme: "dark",
    isSidebarOpen: false,
  });
  useContextProvider(UiContext, uiStore);

  return (
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
  );
});
