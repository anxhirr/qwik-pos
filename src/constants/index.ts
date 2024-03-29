import type { Component } from "@builder.io/qwik";
import {
  CategoryIcon,
  CreateOrderIcon,
  FacilityIcon,
  HomeIcon,
  ItemsIcon,
  OrderIcon,
  PlusIcon,
  ReceiptIcon,
  SettingsIcon,
  ShopIcon,
  SupportAgentIcon,
  // UsersIcon,
} from "~/components/icons";
import type { IconProps } from "~/types";
import type { AppRoutes } from "~/routes.gen";

type Accordion = {
  name: string;
  Icon: Component<IconProps>;
  items: {
    title: string;
    Icon: Component<IconProps>;
    route: AppRoutes;
  }[];
};

export const ACCORDIONS: Accordion[] = [
  {
    name: "Settings",
    Icon: PlusIcon,
    items: [
      {
        title: "Shop",
        Icon: ShopIcon,
        route: "/settings/shop/",
      },
      // {
      //   title: "Users",
      //   Icon: UsersIcon,
      //   route: "/settings/users/",
      // },
      // {
      //   title: "Roles",
      //   Icon: PlusIcon,
      //   route: "/settings/roles/",
      // },
    ],
  },
  {
    name: "Preferences",
    Icon: PlusIcon,
    items: [
      {
        title: "Order",
        Icon: OrderIcon,
        route: "/pref/order/",
      },
      {
        title: "General",
        Icon: SettingsIcon,
        route: "/pref/general/",
      },
    ],
  },
  {
    name: "Entities",
    Icon: PlusIcon,
    items: [
      {
        title: "Categories",
        Icon: CategoryIcon,
        route: "/categories/",
      },
      {
        title: "Facilities",
        Icon: FacilityIcon,
        route: "/facilities/",
      },
    ],
  },
];

export const LIST_ITEMS = [
  {
    title: "Home",
    Icon: HomeIcon,
    route: "/",
  },
  {
    title: "Items",
    Icon: ItemsIcon,
    route: "/items",
  },
  // {
  //   title: "Customers",
  //   Icon: LuRocket,
  //   route: "/customers",
  // },
  {
    title: "Create Order",
    Icon: CreateOrderIcon,
    route: "/orders/create",
  },
  {
    title: "Orders List",
    Icon: ReceiptIcon,
    route: "/orders/list",
  },
  {
    title: "Help",
    Icon: SupportAgentIcon,
    route: "/help",
  },
] as const;
