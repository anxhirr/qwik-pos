import { NavBar } from "./index";
import { $, component$ } from "@builder.io/qwik";

export interface Props {}

export const OrdersNavbar = component$<Props>(() => {
  const onSearch = $((e: Event) => {
    console.log(e);
  });
  return <NavBar title="Orders" onSearch={onSearch} />;
});
