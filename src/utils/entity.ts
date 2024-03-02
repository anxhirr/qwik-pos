import { ENTITY_ROUTE_MAP } from "~/constants/maps";
import type { Entity } from "../../types";

export const getEntityRoute = (entity: Entity) => {
  return ENTITY_ROUTE_MAP.get(entity);
};
