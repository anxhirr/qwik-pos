import { component$ } from "@builder.io/qwik";
import type { Item } from "@prisma/client";

type Props = {
  data: Item;
};
export const ItemCard = component$<Props>(({ data }) => {
  return (
    <div class="card h-full rounded-xl bg-secondary shadow-xl">
      <figure></figure>
      <div class="card-body p-4">
        <h2 class="card-title">
          {data.name}
          <div class="badge badge-accent">{data.unit}</div>
        </h2>
        <p>{data.description}</p>
        <div class="card-actions justify-end">
          <div class="badge badge-outline">category</div>
        </div>
      </div>
    </div>
  );
});
