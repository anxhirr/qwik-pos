import { NavBar } from "./base";
import { $, component$ } from "@builder.io/qwik";

export interface Props {}

export const FacilitiesNavbar = component$<Props>(() => {
  const onSearch = $((e: Event) => {
    console.log(e);
  });
  return <NavBar title="Facilities" onSearch={onSearch} />;
});
