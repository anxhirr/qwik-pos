import { PlusIcon } from "~/components/icons";

export const ACCORDIONS = [
  {
    name: "Settings",
    prefix: PlusIcon,
    items: [
      {
        title: "Shop",
        prefix: PlusIcon,
        route: "/settings/shop",
      },
      {
        title: "Users",
        prefix: PlusIcon,
        route: "/settings/users",
      },
      {
        title: "Roles",
        prefix: PlusIcon,
        route: "/settings/roles",
      },
    ],
  },
  {
    name: "Preferences",
    prefix: PlusIcon,
    items: [
      {
        title: "Order",
        prefix: PlusIcon,
        route: "/pref/order",
      },
      {
        title: "General",
        prefix: PlusIcon,
        route: "/pref/general",
      },
    ],
  },
  {
    name: "Entities",
    prefix: PlusIcon,
    items: [
      {
        title: "Categories",
        prefix: PlusIcon,
        route: "/categories",
      },
    ],
  },
] as const;

export const LIST_ITEMS = [
  {
    title: "Home",
    prefix: PlusIcon,
    route: "/",
    suffix: 0,
  },
  {
    title: "Items",
    prefix: PlusIcon,
    route: "/items",
    suffix: 0,
  },
  {
    title: "Items List",
    prefix: PlusIcon,
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
    title: "Create Order",
    prefix: PlusIcon,
    route: "/orders/create",
    suffix: 0,
  },
  {
    title: "Orders List",
    prefix: PlusIcon,
    route: "/orders/list",
    suffix: 0,
  },
  {
    title: "Help",
    prefix: PlusIcon,
    route: "/help",
    suffix: 0,
  },
] as const;
