export const tableFlexRender = (comp: any, attrs: any) => {
  if (typeof comp === "function") {
    return comp(attrs);
  }

  return comp;
};

export const renderBoolean = (value: boolean) => (value ? "Yes" : "No");
