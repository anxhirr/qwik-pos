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
  UsersIcon,
} from "~/components/icons";

export const ACCORDIONS = [
  {
    name: "Settings",
    Icon: PlusIcon,
    items: [
      {
        title: "Shop",
        Icon: ShopIcon,
        route: "/settings/shop",
      },
      {
        title: "Users",
        Icon: UsersIcon,
        route: "/settings/users",
      },
      {
        title: "Roles",
        Icon: PlusIcon,
        route: "/settings/roles",
      },
    ],
  },
  {
    name: "Preferences",
    Icon: PlusIcon,
    items: [
      {
        title: "Order",
        Icon: OrderIcon,
        route: "/pref/order",
      },
      {
        title: "General",
        Icon: SettingsIcon,
        route: "/pref/general",
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
        route: "/categories",
      },
      {
        title: "Facilities",
        Icon: FacilityIcon,
        route: "/facilities",
      },
    ],
  },
] as const;

export const LIST_ITEMS = [
  {
    title: "Home",
    Icon: HomeIcon,
    route: "/",
  },
  {
    title: "Create Item",
    Icon: PlusIcon,
    route: "/items/create",
  },
  {
    title: "Items",
    Icon: ItemsIcon,
    route: "/items",
  },
  {
    title: "Items List",
    Icon: ItemsIcon,
    route: "/items/list",
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
