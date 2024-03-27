///////////////////////////////////////////////////////////////////////////
/// GENERATED FILE --- DO NOT EDIT --- YOUR CHANGES WILL BE OVERWRITTEN ///
///////////////////////////////////////////////////////////////////////////

export type AppRoutes =
  | "/"
  | "/account/"
  | "/account/facilities/"
  | "/account/integrations/"
  | "/account/security/"
  | "/account/shops/"
  | "/categories/"
  | "/facilities/"
  | "/items/"
  | "/items/create/"
  | "/items/list/"
  | "/items/update/[id]/"
  | "/orders/"
  | "/orders/create/"
  | "/orders/list/"
  | "/orders/update/[id]/"
  | "/pref/general/"
  | "/pref/order/"
  | "/settings/shop/";

export interface AppRouteMap {
  "/": {};
  "/account/": {};
  "/account/facilities/": {};
  "/account/integrations/": {};
  "/account/security/": {};
  "/account/shops/": {};
  "/categories/": {};
  "/facilities/": {};
  "/items/": {};
  "/items/create/": {};
  "/items/list/": {};
  "/items/update/[id]/": { id: string };
  "/orders/": {};
  "/orders/create/": {};
  "/orders/list/": {};
  "/orders/update/[id]/": { id: string };
  "/pref/general/": {};
  "/pref/order/": {};
  "/settings/shop/": {};
}

export interface AppRouteParamsFunction {
  (route: "/", params?: {}): string;
  (route: "/account/", params?: {}): string;
  (route: "/account/facilities/", params?: {}): string;
  (route: "/account/integrations/", params?: {}): string;
  (route: "/account/security/", params?: {}): string;
  (route: "/account/shops/", params?: {}): string;
  (route: "/categories/", params?: {}): string;
  (route: "/facilities/", params?: {}): string;
  (route: "/items/", params?: {}): string;
  (route: "/items/create/", params?: {}): string;
  (route: "/items/list/", params?: {}): string;
  (route: "/items/update/[id]/", params: { id: string }): string;
  (route: "/orders/", params?: {}): string;
  (route: "/orders/create/", params?: {}): string;
  (route: "/orders/list/", params?: {}): string;
  (route: "/orders/update/[id]/", params: { id: string }): string;
  (route: "/pref/general/", params?: {}): string;
  (route: "/pref/order/", params?: {}): string;
  (route: "/settings/shop/", params?: {}): string;
}

export type AppLinkProps =
  | { route: "/" }
  | { route: "/account/" }
  | { route: "/account/facilities/" }
  | { route: "/account/integrations/" }
  | { route: "/account/security/" }
  | { route: "/account/shops/" }
  | { route: "/categories/" }
  | { route: "/facilities/" }
  | { route: "/items/" }
  | { route: "/items/create/" }
  | { route: "/items/list/" }
  | { route: "/items/update/[id]/"; "param:id": string }
  | { route: "/orders/" }
  | { route: "/orders/create/" }
  | { route: "/orders/list/" }
  | { route: "/orders/update/[id]/"; "param:id": string }
  | { route: "/pref/general/" }
  | { route: "/pref/order/" }
  | { route: "/settings/shop/" };
