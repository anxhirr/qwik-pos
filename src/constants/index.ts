import { LuRocket } from "@qwikest/icons/lucide";

export const ACCORDIONS = [
  {
    name: "Settings",
    prefix: LuRocket,
    items: [
      {
        title: "Shop",
        prefix: LuRocket,
        route: "/settings/shop",
      },
      {
        title: "Users",
        prefix: LuRocket,
        route: "/settings/users",
      },
      {
        title: "Roles",
        prefix: LuRocket,
        route: "/settings/roles",
      },
    ],
  },
  {
    name: "Preferences",
    prefix: LuRocket,
    items: [
      {
        title: "Order",
        prefix: LuRocket,
        route: "/pref/order",
      },
      {
        title: "General",
        prefix: LuRocket,
        route: "/pref/general",
      },
    ],
  },
  {
    name: "Entities",
    prefix: LuRocket,
    items: [
      {
        title: "Categories",
        prefix: LuRocket,
        route: "/categories",
      },
    ],
  },
] as const;

export const LIST_ITEMS = [
  {
    title: "Home",
    prefix: LuRocket,
    route: "/",
    suffix: 0,
  },
  {
    title: "Items",
    prefix: LuRocket,
    route: "/items",
    suffix: 0,
  },
  {
    title: "Items List",
    prefix: LuRocket,
    route: "/items/list",
    suffix: 0,
  },
  // {
  //   title: "Customers",
  //   prefix: LuRocket,
  //   route: "/customers",
  //   suffix: 0,
  // },
  {
    title: "New Order",
    prefix: LuRocket,
    route: "/orders/new",
    suffix: 0,
  },
  {
    title: "Orders List",
    prefix: LuRocket,
    route: "/orders/list",
    suffix: 0,
  },
  {
    title: "Help",
    prefix: LuRocket,
    route: "/help",
    suffix: 0,
  },
] as const;
