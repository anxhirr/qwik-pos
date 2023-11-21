import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { InitialValues, ResponseData } from "@modular-forms/qwik";
import { formAction$, useFormStore, valiForm$ } from "@modular-forms/qwik";
import { ShopForm } from "~/components/forms/shop/ShopForm";
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

export const useFormAction = formAction$<ShopFormType, ResponseData>( // TODO: we do not want to create a new shop, we want to update the existing one
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
  const action = useFormAction();
  const sform = useFormStore<ShopFormType, ResponseData>({
    loader: useFormLoader(),
    validate: valiForm$(ShopSchema),
  });

  return (
    <div>
      <ShopForm form={sform} action={action} />
    </div>
  );
});
