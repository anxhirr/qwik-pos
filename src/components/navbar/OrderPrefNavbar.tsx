import { NavBar } from "./base";
import { $, component$ } from "@builder.io/qwik";

export interface Props {}

export const OrderPrefNavbar = component$<Props>(() => {
  const onSearch = $((e: Event) => {
    console.log(e);
  });

  return <NavBar title="Order Pref" onSearch={onSearch} />;
});
