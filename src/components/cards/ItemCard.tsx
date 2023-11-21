import { component$ } from "@builder.io/qwik";
import type { Item } from "@prisma/client";

type Props = {
  data: Item;
};
export const ItemCard = component$<Props>(({ data }) => {
  return (
    <div class="card h-full bg-base-100 shadow-xl">
      <figure></figure>
      <div class="card-body">
        <h2 class="card-title">
          {data.name}
          <div class="badge badge-secondary">{data.unit}</div>
        </h2>
        <p>{data.description}</p>
        <div class="card-actions justify-end">
          <div class="badge badge-outline">Fashion</div>
          <div class="badge badge-outline">Products</div>
        </div>
      </div>
    </div>
  );
});
