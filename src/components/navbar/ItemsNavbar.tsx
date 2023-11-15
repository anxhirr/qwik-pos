import { NavBar } from "./index";
import { $, component$ } from "@builder.io/qwik";

export interface ItemsNavbarProps {}

export const ItemsNavbar = component$<ItemsNavbarProps>(() => {
  const onSearch = $((e: Event) => {
    console.log(e);
  });
  return <NavBar title="Items" onSearch={onSearch} />;
});
