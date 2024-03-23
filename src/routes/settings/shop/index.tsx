import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { InitialValues, ResponseData } from "@modular-forms/qwik";
import { formAction$, useFormStore, valiForm$ } from "@modular-forms/qwik";
import { ShopUpdateActionBar } from "~/components/bottom-nav/shop/update";
import { ShopForm } from "~/components/forms/shop/ShopForm";
import { prisma } from "~/routes/plugin@auth";
import type { ShopFormType } from "~/validation/shopSchema";
import { ShopSchema } from "~/validation/shopSchema";
import { getSessionSS } from "~/utils/auth";

export const useFormLoader = routeLoader$<InitialValues<ShopFormType>>(
  async (event) => {
    const session = getSessionSS(event);
    const shop = await prisma.shop.findUnique({
      where: {
        id: session.shopId,
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

export const useFormAction = formAction$<ShopFormType, ResponseData>(
  async (values, event) => {
    const session = getSessionSS(event);

    const updatedShop = await prisma.shop.update({
      where: {
        id: session.shopId,
      },
      data: {
        address: values.address,
        baseCurrency: values.baseCurrency,
        city: values.city,
        description: values.description,
        email: values.email,
        name: values.name,
        phone: values.phone,
      },
    });

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
  const form = useFormStore<ShopFormType, ResponseData>({
    loader: useFormLoader(),
    validate: valiForm$(ShopSchema),
  });

  return (
    <>
      <div class="main-content">
        <ShopForm form={form} action={action} />
      </div>
      <ShopUpdateActionBar form={form} />
    </>
  );
});
