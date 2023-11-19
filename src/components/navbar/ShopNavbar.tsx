import { NavBar } from "./index";
import { $, component$ } from "@builder.io/qwik";

export interface ItemsNavbarProps {}

export const ShopNavbar = component$<ItemsNavbarProps>(() => {
  const onSearch = $((e: Event) => {
    console.log(e);
  });
  return <NavBar title="Shop" onSearch={onSearch} />;
});
