import { Link } from "@builder.io/qwik-city";
import { ACCORDIONS, LIST_ITEMS } from "~/constants";
import { Button } from "./buttons";

export default function Sidebar() {
  return (
    <div class="h-full max-h-screen w-full max-w-[15rem] overflow-auto p-4">
      <ul class="flex min-w-full flex-col gap-2">
        <div class="join join-vertical w-full">
          {ACCORDIONS.map((accordion, i) => {
            return (
              <div
                key={i}
                class="collapse join-item collapse-arrow border border-2 border-secondary"
              >
                <input type="radio" name="my-accordion-4" />
                <div class="collapse-title text-xl font-medium">
                  {accordion.name}
                </div>
                <div class="collapse-content">
                  <ul>
                    {accordion.items.map((item, j) => (
                      <Link href={item.route} key={j}>
                        <li class="cursor-pointer rounded-md p-2 ps-4 hover:bg-secondary">
                          <p>{item.title}</p>
                        </li>
                      </Link>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
        <ul class="flex flex-col gap-2">
          {LIST_ITEMS.map(({ title, prefix: Icon, route }, i) => {
            return (
              <li key={i}>
                <Link href={route}>
                  <Button
                    text={title}
                    Icon={Icon}
                    variant="secondary"
                    fullWidth
                    justify="start"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </ul>
    </div>
  );
}
