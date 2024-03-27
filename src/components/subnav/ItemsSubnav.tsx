import { SubNav } from "./base";
import { component$ } from "@builder.io/qwik";
import type { Section } from "../../../types";

export interface Props {}

const SECTIONS: Section[] = [
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
