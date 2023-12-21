import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { InitialValues, ResponseData } from "@modular-forms/qwik";
import { formAction$, useFormStore, valiForm$ } from "@modular-forms/qwik";
import { ShopForm } from "~/components/forms/shop/ShopForm";
import { prisma } from "~/routes/plugin@auth";
import type { ShopFormType } from "~/types-and-validation/shopSchema";
import { ShopSchema } from "~/types-and-validation/shopSchema";
import { getSessionSS } from "~/utils/auth";

export const useFormLoader = routeLoader$<InitialValues<ShopFormType>>(() => {
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
});

export const useFormAction = formAction$<ShopFormType, ResponseData>(
  async (values, event) => {
    const session = getSessionSS(event);

    await prisma.shop.create({
      data: {
        address: values.address,
        baseCurrency: values.baseCurrency,
        city: values.city,
        description: values.description,
        email: values.email,
        name: values.name,
        phone: values.phone,
        ownerId: session.userId,
      },
    });

    await prisma.userShop.create({
      data: {
        userId: session.userId,
        shopId: session.shopId,
        roleId: session.roleId,
      },
    });
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
    <div>
      <ShopForm form={form} action={action} />
    </div>
  );
});
