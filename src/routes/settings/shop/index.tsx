import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { InitialValues, ResponseData } from "@modular-forms/qwik";
import { formAction$, useForm, valiForm$ } from "@modular-forms/qwik";
import { ShopUpdateActionBar } from "~/components/bottom-action-bar/shop/update";
import { prisma } from "~/routes/plugin@auth";
import type { ShopFormType } from "~/types-and-validation/shopSchema";
import { ShopSchema } from "~/types-and-validation/shopSchema";

export const useFormLoader = routeLoader$<InitialValues<ShopFormType>>(
  async () => {
    const shops = await prisma.shop.findMany(); // TODO: fetch only the current user's shop
    console.log("shops", shops);

    if (!shops.length) {
      return {
        address: "",
        baseCurrency: "",
        city: "",
        description: "",
        email: "",
        name: "",
        ownerId: "",
        phone: "",
      };
    }

    return shops[0];
  },
);

export const useFormAction = formAction$<ShopFormType, ResponseData>(
  async (values) => {
    // Runs on server
    console.log("formAction$ values", values);

    // create a new shop

    const newShop = await prisma.shop.create({
      data: {
        address: values.address,
        baseCurrency: values.baseCurrency,
        city: values.city,
        description: values.description,
        email: values.email,
        name: values.name,
        ownerId: values.ownerId,
        phone: values.phone,
      },
    });

    console.log("newShop", newShop);

    if (!newShop.id) {
      return {
        status: "error",
        message: "Error creating shop",
      };
    }

    return {
      status: "success",
      data: newShop,
    };
  },
  valiForm$(ShopSchema),
);

export default component$(() => {
  const [form, { Form, Field }] = useForm<ShopFormType>({
    loader: useFormLoader(),
    action: useFormAction(),
    validate: valiForm$(ShopSchema),
  });

  return (
    <div>
      <Form class="flex flex-col gap-4">
        <Field name="address">
          {(field, props) => (
            <div>
              <input
                class="input input-bordered"
                {...props}
                type="text"
                value={field.value}
                placeholder="Address"
              />
              {field.error && <div>{field.error}</div>}
            </div>
          )}
        </Field>
        <Field name="baseCurrency">
          {(field, props) => (
            <div>
              <input
                class="input input-bordered"
                {...props}
                type="text"
                value={field.value}
                placeholder="Base Currency"
              />
              {field.error && <div>{field.error}</div>}
            </div>
          )}
        </Field>
        <Field name="city">
          {(field, props) => (
            <div>
              <input
                class="input input-bordered"
                {...props}
                type="text"
                value={field.value}
                placeholder="City"
              />
              {field.error && <div>{field.error}</div>}
            </div>
          )}
        </Field>
        <Field name="description">
          {(field, props) => (
            <div>
              <input
                class="input input-bordered"
                {...props}
                type="text"
                value={field.value}
                placeholder="Description"
              />
              {field.error && <div>{field.error}</div>}
            </div>
          )}
        </Field>
        <Field name="email">
          {(field, props) => (
            <div>
              <input
                class="input input-bordered"
                {...props}
                type="text"
                value={field.value}
                placeholder="Email"
              />
              {field.error && <div>{field.error}</div>}
            </div>
          )}
        </Field>
        <Field name="name">
          {(field, props) => (
            <div>
              <input
                class="input input-bordered"
                {...props}
                type="text"
                value={field.value}
                placeholder="Name"
              />
              {field.error && <div>{field.error}</div>}
            </div>
          )}
        </Field>
        <Field name="ownerId">
          {(field, props) => (
            <div>
              <input
                class="input input-bordered"
                {...props}
                type="text"
                value={field.value}
                placeholder="Owner ID"
              />
              {field.error && <div>{field.error}</div>}
            </div>
          )}
        </Field>
        <Field name="phone">
          {(field, props) => (
            <div>
              <input
                class="input input-bordered"
                {...props}
                type="text"
                value={field.value}
                placeholder="Phone"
              />
              {field.error && <div>{field.error}</div>}
            </div>
          )}
        </Field>
        <ShopUpdateActionBar form={form} />
      </Form>
    </div>
  );
});
