import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { InitialValues, ResponseData } from "@modular-forms/qwik";
import { formAction$, useFormStore, valiForm$ } from "@modular-forms/qwik";
import { ShopForm } from "~/components/forms/shop/ShopForm";
import { prisma } from "~/routes/plugin@auth";
import type { ShopFormType } from "~/types-and-validation/shopSchema";
import { ShopSchema } from "~/types-and-validation/shopSchema";
import { getSessionSS } from "~/utils/auth";

export const useFormLoader = routeLoader$<InitialValues<ShopFormType>>(
  async (event) => {
    const session = getSessionSS(event);
    const shop = await prisma.shop.findUnique({
      where: {
        id: session?.shopId,
      },
      include: {
        users: true,
      },
    });

    if (!shop) {
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

    return {
      address: shop.address,
      baseCurrency: shop.baseCurrency,
      city: shop.city,
      description: shop.description,
      email: shop.email,
      name: shop.name,
      ownerId: shop.ownerId,
      phone: shop.phone,
    };
  },
);

export const useFormAction = formAction$<ShopFormType, ResponseData>( // TODO: we do not want to create a new shop, we want to update the existing one
  async (values) => {
    // Runs on server
    // console.log("formAction$ values", values);

    // create a new shop

    // const newShop = await prisma.shop.create({
    //   data: {
    //     address: values.address,
    //     baseCurrency: values.baseCurrency,
    //     city: values.city,
    //     description: values.description,
    //     email: values.email,
    //     name: values.name,
    //     ownerId: values.ownerId,
    //     phone: values.phone,
    //     users: {
    //       create: [
    //         {
    //           roleId: values.ownerId,
    //           userId: values.ownerId,
    //         },
    //       ],
    //     },
    //   },
    // });

    // console.log("newShop", newShop);

    // if (!newShop.id) {
    //   return {
    //     status: "error",
    //     message: "Error creating shop",
    //   };
    // }

    // return {
    //   status: "success",
    //   data: newShop,
    // };

    const updatedShop = await prisma.shop.update({
      where: {
        id: "656374af7d001c2bdb2ae73e",
      },
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

    console.log("updatedShop", updatedShop);

    if (!updatedShop.id) {
      return {
        status: "error",
        message: "Error updating shop",
      };
    }

    return {
      status: "success",
      data: updatedShop,
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
