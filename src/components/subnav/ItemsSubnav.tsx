import { SubNav } from "./base";
import { component$ } from "@builder.io/qwik";
import type { Section } from "~/types";

interface Props {}

const SECTIONS: Section[] = [
  {
    name: "Overview",
    route: "/items/",
  },
  {
    name: "Create",
    route: "/items/create/",
  },
  {
    name: "List",
    route: "/items/list/",
  },
];

export const ItemsSubnav = component$<Props>(() => {
  return <SubNav sections={SECTIONS} />;
});
