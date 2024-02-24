import { NavBar } from "./base";
import { $, component$ } from "@builder.io/qwik";

export interface Props {}

export const GeneralPrefNavbar = component$<Props>(() => {
  const onSearch = $((e: Event) => {
    console.log(e);
  });

  return <NavBar title="General Pref" onSearch={onSearch} />;
});
