import { IcRoundPlus } from "~/components/icons";

export const ACCORDIONS = [
  {
    name: "Settings",
    prefix: IcRoundPlus,
    items: [
      {
        title: "Shop",
        prefix: IcRoundPlus,
        route: "/settings/shop",
      },
      {
        title: "Users",
        prefix: IcRoundPlus,
        route: "/settings/users",
      },
      {
        title: "Roles",
        prefix: IcRoundPlus,
        route: "/settings/roles",
      },
    ],
  },
  {
    name: "Preferences",
    prefix: IcRoundPlus,
    items: [
      {
        title: "Order",
        prefix: IcRoundPlus,
        route: "/pref/order",
      },
      {
        title: "General",
        prefix: IcRoundPlus,
        route: "/pref/general",
      },
    ],
  },
  {
    name: "Entities",
    prefix: IcRoundPlus,
    items: [
      {
        title: "Categories",
        prefix: IcRoundPlus,
        route: "/categories",
      },
    ],
  },
] as const;

export const LIST_ITEMS = [
  {
    title: "Home",
    prefix: IcRoundPlus,
    route: "/",
    suffix: 0,
  },
  {
    title: "Items",
    prefix: IcRoundPlus,
    route: "/items",
    suffix: 0,
  },
  {
    title: "Items List",
    prefix: IcRoundPlus,
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
    prefix: IcRoundPlus,
    route: "/orders/create",
    suffix: 0,
  },
  {
    title: "Orders List",
    prefix: IcRoundPlus,
    route: "/orders/list",
    suffix: 0,
  },
  {
    title: "Help",
    prefix: IcRoundPlus,
    route: "/help",
    suffix: 0,
  },
] as const;
