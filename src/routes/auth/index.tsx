import { component$ } from "@builder.io/qwik";
import { useAuthSignin } from "~/routes/plugin@auth";

export default component$(() => {
  const signIn = useAuthSignin();

  return (
    <>
      <div class="relative flex h-screen flex-col justify-center overflow-hidden">
        <div class="m-auto w-full rounded-md bg-white p-6 shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
          <h1 class="text-center text-3xl font-semibold text-gray-700">Auth</h1>

          <button
            class="btn btn-primary btn-block"
            onClick$={() =>
              signIn.submit({
                providerId: "github",
                options: {
                  callbackUrl: "/",
                },
              })
            }
          >
            GitHub
          </button>
        </div>
      </div>
    </>
  );
});
