import { NavBar } from "./base";
import { $, component$ } from "@builder.io/qwik";

export interface Props {}

export const ItemsNavbar = component$<Props>(() => {
  const onSearch = $((e: Event) => {
    console.log(e);
  });
  return <NavBar title="Items" onSearch={onSearch} />;
});
