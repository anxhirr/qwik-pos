import { component$ } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import { prisma } from "../plugin@auth";
import { ItemsBActionBar } from "~/components/bottom-action-bar/items/index";

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
              <div class="card h-full bg-base-100 shadow-xl">
                <figure>
                  {/* <img
                    src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                    alt="Shoes"
                  /> */}
                </figure>
                <div class="card-body">
                  <h2 class="card-title">
                    {item.name}
                    <div class="badge badge-secondary">{item.unit}</div>
                  </h2>
                  <p>
                    {/* DESCRIPTION If a dog chews shoes whose shoes does he choose? */}
                    {item.description}
                  </p>
                  <div class="card-actions justify-end">
                    <div class="badge badge-outline">Fashion</div>
                    <div class="badge badge-outline">Products</div>
                  </div>
                </div>
              </div>
            </li>
          </Link>
        ))}
      </ul>
      <ItemsBActionBar />
    </div>
  );
});
