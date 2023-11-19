import { NavBar } from "./index";
import { $, component$ } from "@builder.io/qwik";

export interface Props {}

export const ShopNavbar = component$<Props>(() => {
  const onSearch = $((e: Event) => {
    console.log(e);
  });
  return <NavBar title="Shop" onSearch={onSearch} />;
});
