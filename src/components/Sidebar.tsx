import { Link } from "@builder.io/qwik-city";
import { ACCORDIONS, LIST_ITEMS } from "~/constants";

export default function Sidebar() {
  return (
    <div class="h-full max-h-screen w-full max-w-[15rem] overflow-auto p-4">
      <ul class="min-w-full">
        <div class="join join-vertical w-full">
          {ACCORDIONS.map((accordion, i) => {
            return (
              <div
                key={i}
                class="collapse join-item collapse-arrow border border-base-300"
              >
                <input type="radio" name="my-accordion-4" />
                <div class="collapse-title text-xl font-medium">
                  {accordion.name}
                </div>
                <div class="collapse-content">
                  {accordion.items.map((item, j) => (
                    <Link href={item.route} key={j}>
                      <p>{item.title}</p>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <ul class="flex flex-col gap-2">
          {LIST_ITEMS.map(({ title, suffix, prefix: Icon, route }, i) => {
            return (
              <li key={i}>
                <Link href={route}>
                  <button class="btn btn-secondary w-full justify-start">
                    <Icon />
                    {title}
                    {suffix ? suffix : null}
                  </button>
                </Link>
              </li>
            );
          })}
        </ul>
      </ul>
    </div>
  );
}
