import { NavBar } from "./index";
import { $, component$ } from "@builder.io/qwik";

export interface Props {}

export const CategoriesNavbar = component$<Props>(() => {
  const onSearch = $((e: Event) => {
    console.log(e);
  });
  return <NavBar title="Categories" onSearch={onSearch} />;
});
