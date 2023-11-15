import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export const ItemsBActionBar = component$(() => {
  return (
    <div class="navbar fixed bottom-0 right-0 bg-base-100">
      <div class="navbar-start"></div>
      <div class="navbar-center"></div>
      <div class="navbar-end">
        <Link href="/items/new">
          <button class="btn btn-primary">Add New</button>
        </Link>
      </div>
    </div>
  );
});
