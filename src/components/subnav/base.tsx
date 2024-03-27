import { component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import clsx from "clsx";
import type { AppRoutes } from "~/routes.gen";

type Section = {
  name: string;
  route: AppRoutes;
};

export const SubNav = component$<{
  sections: Section[];
}>(({ sections }) => {
  const loc = useLocation();
  return (
    <div class="flex">
      <div role="tablist" class="tabs tabs-bordered">
        {sections.map((section) => (
          <Link
            key={section.name}
            role="tab"
            href={section.route}
            class={clsx(
              "tab hover:bg-secondary",
              loc.url.pathname === section.route && "tab-active",
            )}
          >
            {section.name}
          </Link>
        ))}
      </div>
    </div>
  );
});
