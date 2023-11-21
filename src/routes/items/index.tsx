import { component$ } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import { prisma } from "../plugin@auth";
import { ItemsBActionBar } from "~/components/bottom-action-bar/items/index";
import { ItemCard } from "~/components/cards/ItemCard";

export const useItemsLoader = routeLoader$(async () => {
  const items = await prisma.item.findMany();

  return items;
});
export default component$(() => {
  const items = useItemsLoader();

  return (
    <div>
      <ul class="3xl:grid-cols-4 grid grid-cols-1 gap-4  sm:grid-cols-2 xl:grid-cols-3">
        {items.value.map((item) => (
          <Link key={item.id} href={`/items/${item.id}`}>
            <li class="h-full">
              <ItemCard data={item} />
            </li>
          </Link>
        ))}
      </ul>
      <ItemsBActionBar />
    </div>
  );
});
