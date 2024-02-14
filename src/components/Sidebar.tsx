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
                class="collapse-arrow collapse join-item border-2 border-secondary"
              >
                <input type="radio" name="my-accordion-4" />
                <div class="collapse-title text-xl font-medium">
                  {accordion.name}
                </div>
                <div class="collapse-content">
                  <ul class="flex flex-col gap-1">
                    {accordion.items.map(({ route, Icon, title }, j) => (
                      <Link href={route} key={j}>
                        <Button
                          text={title}
                          Icon={Icon}
                          variant="secondary"
                          fullWidth
                          justify="start"
                        />
                      </Link>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
        <ul class="flex flex-col gap-2">
          {LIST_ITEMS.map(({ title, Icon, route }, i) => {
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
