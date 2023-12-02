import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";

import { useAuthSession, useAuthSignout } from "./plugin@auth";

export default component$(() => {
  const session = useAuthSession();
  const signOut = useAuthSignout();

  return (
    <>
      <div class="flex">
        <div class="relative flex h-screen flex-col justify-center overflow-hidden">
          <div class="m-auto w-full rounded-md bg-white p-6 shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
            <h1 class="text-center text-3xl font-semibold text-gray-700">
              Welcome {session.value?.user?.name}
            </h1>
            <button
              class="btn"
              onClick$={() => signOut.submit({ callbackUrl: "/" })}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
