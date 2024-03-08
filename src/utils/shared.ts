export const isString = (value: unknown): value is string => {
  return typeof value === "string";
};

export const isUndefined = (value: unknown): value is undefined => {
  return value === undefined;
}
