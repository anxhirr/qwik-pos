import { Slot, component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Button } from "~/components/buttons";
import { ShopNavbar } from "~/components/navbar/ShopNavbar";
import type { AppRoutes } from "~/routes.gen";

export interface LayoutProps {}

type Section = {
  name: string;
  route: AppRoutes;
};
const SECTIONS: Section[] = [
  {
    name: "General",
    route: "/account/",
  },
  {
    name: "Shops",
    route: "/account/shops/",
  },
  {
    name: "Facilities",
    route: "/account/facilities/",
  },
  {
    name: "Security",
    route: "/account/security/",
  },
  {
    name: "Integrations",
    route: "/account/integrations/",
  },
];
export default component$<LayoutProps>(() => {
  return (
    <div class="flex h-full flex-col">
      <ShopNavbar />
      <header class="border-y">
        <div class="m-auto my-10 max-w-screen-xl px-4">
          <h1 class="h1">Account Settings</h1>
        </div>
      </header>
      <main>
        <div class="m-auto my-5 max-w-screen-xl px-4">
          <div class="max-w-[15rem]">
            <ul>
              {SECTIONS.map((section) => (
                <li key={section.name}>
                  <Link href={section.route}>
                    <Button
                      variant="ghost"
                      text={section.name}
                      fullWidth
                      justify="start"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Slot />
          </div>
        </div>
      </main>
    </div>
  );
});
