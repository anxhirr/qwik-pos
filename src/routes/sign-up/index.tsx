import { $, component$ } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import type { InitialValues, SubmitHandler } from "@modular-forms/qwik";
import { formAction$, useForm, valiForm$ } from "@modular-forms/qwik";
import { email, type Input, minLength, object, string } from "valibot";
import { prisma } from "../plugin@auth";

const SignupSchema = object({
  name: string([minLength(1, "Please enter your user name.")]),
  email: string([
    minLength(1, "Please enter your email."),
    email("The email address is badly formatted."),
  ]),
  password: string([
    minLength(1, "Please enter your password."),
    minLength(8, "Your password must have 8 characters or more."),
  ]),
});

type SignupForm = Input<typeof SignupSchema>;

export const useFormLoader = routeLoader$<InitialValues<SignupForm>>(() => ({
  email: "",
  password: "",
  name: "",
}));

export const useFormAction = formAction$<SignupForm>(async (values) => {
  const userExists = await prisma.user.findUnique({
    where: { email: values.email },
  });

  // authenticate user using mongoDB
  if (userExists) {
    console.log("userExists", userExists);
  }

  // create user
  const user = await prisma.user.create({
    data: {
      email: values.email,
      name: values.name,
    },
  });
  console.log("user", user);
}, valiForm$(SignupSchema));

export default component$(() => {
  const [SignupForm, { Form, Field }] = useForm<SignupForm>({
    loader: useFormLoader(),
    action: useFormAction(),
    validate: valiForm$(SignupSchema),
  });

  const handleSubmit: SubmitHandler<SignupForm> = $(
    (values: SignupForm, event: any) => {
      // Runs on client
      console.log("SignupForm", SignupForm);
      console.log("values", values);
      console.log("event", event);
    },
  );

  return (
    <>
      <div class="relative flex h-screen flex-col justify-center overflow-hidden">
        <div class="m-auto w-full rounded-md bg-white p-6 shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
          <h1 class="text-center text-3xl font-semibold text-gray-700">
            DaisyUI
          </h1>
          {/* eslint-disable-next-line qwik/valid-lexical-scope */}
          <Form class="space-y-4" onSubmit$={handleSubmit}>
            <Field name="name">
              {(field, props) => (
                <div>
                  <input
                    {...props}
                    type="text"
                    placeholder="User Name"
                    class="input input-bordered w-full"
                    value={field.value}
                  />
                  {field.error && <div>{field.error}</div>}
                </div>
              )}
            </Field>
            <Field name="email">
              {(field, props) => (
                <div>
                  <input
                    {...props}
                    type="email"
                    placeholder="Email Address"
                    class="input input-bordered w-full"
                    value={field.value}
                  />
                  {field.error && <div>{field.error}</div>}
                </div>
              )}
            </Field>
            <Field name="password">
              {(field, props) => (
                <div>
                  <input
                    {...props}
                    type="password"
                    placeholder="Enter Password"
                    class="input input-bordered w-full"
                    value={field.value}
                  />
                  {field.error && <div>{field.error}</div>}
                </div>
              )}
            </Field>
            <Link
              href="/sign-in"
              class="text-xs text-gray-600 hover:text-blue-600 hover:underline"
            >
              Already have an account?
            </Link>
            <div>
              <button class="btn btn-block">Sign Up</button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
});
