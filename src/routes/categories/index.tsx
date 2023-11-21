import { CategoriesBActionBar } from "~/components/bottom-action-bar/categories";

import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { prisma } from "../plugin@auth";
import { CategoryCard } from "~/components/cards/CategoryCard";
import { CategoryDialog } from "~/components/dialogs/CategoryDialog";

export const useCategoriesLoader = routeLoader$(async () => {
  const categories = await prisma.category.findMany();
  return categories;
});

export default component$(() => {
  const data = useCategoriesLoader();

  return (
    <div>
      <ul class="3xl:grid-cols-5 grid grid-cols-1 gap-4  sm:grid-cols-3 xl:grid-cols-4">
        {data.value.map((cat) => (
          <li key={cat.id} class="h-full">
            <CategoryCard data={cat} />
          </li>
        ))}
      </ul>

      <CategoryDialog />
      <CategoriesBActionBar />
    </div>
  );
});
