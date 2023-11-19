import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import { useAuthSession, useAuthSignout } from "./plugin@auth";

// export const onRequest: RequestHandler = (event) => {
//   const session: Session | null = event.sharedMap.get("session");
//   if (!session || new Date(session.expires) < new Date()) {
//     throw event.redirect(
//       302,
//       `/api/auth/signin?callbackUrl=${event.url.pathname}`,
//     );
//   }
// };

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
              onClick$={() =>
                signOut.submit({
                  callbackUrl: "/",
                })
              }
            >
              log out
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
