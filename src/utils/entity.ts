import type { Entity } from "../../types";

const ENTITY_TO_ROUTE = {
  ITEM: "/items",
  CATEGORY: "/categories",
  ORDER: "/orders",
  CUSTOMER: "/customers",
} as const;

export const getEntityRoute = (entity: Entity) => {
  return ENTITY_TO_ROUTE[entity];
};
