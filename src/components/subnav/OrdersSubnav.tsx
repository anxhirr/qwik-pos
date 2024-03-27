import { SubNav } from "./base";
import { component$ } from "@builder.io/qwik";
import type { Section } from "~/types";

interface Props {}

const SECTIONS: Section[] = [
  {
    name: "Create",
    route: "/orders/create/",
  },
  {
    name: "List",
    route: "/orders/list/",
  },
];

export const OrdersSubnav = component$<Props>(() => {
  return <SubNav sections={SECTIONS} />;
});
