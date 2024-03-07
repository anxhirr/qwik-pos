import type { JSONValue } from "@builder.io/qwik-city";
import { isString } from "~/utils";

export const checkIsIdValid = (id: JSONValue): id is string => {
  return !!id && isString(id);
};

export const checkIsIdsValid = (ids: JSONValue): ids is string[] => {
  return Array.isArray(ids) && ids.every(isString);
};
