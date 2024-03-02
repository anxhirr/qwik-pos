export const checkIsSearchParamsIdValid = (id: string | null): id is string => {
  return !!id;
};
